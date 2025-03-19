import { supabase, isSupabaseConfigured } from "./supabase";
import {
  getData,
  saveData,
  resetData,
  PlayerData,
} from "../components/admin/DataService";

// Function to initialize the database with default data if empty
export const initializeDatabase = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Using local storage instead.");
    return;
  }

  try {
    // Check if the table exists and has data
    const { data: existingData, error: checkError } = await supabase
      .from("player_data")
      .select("id")
      .limit(1);

    if (checkError) throw checkError;

    // If no data exists, initialize with default data
    if (!existingData || existingData.length === 0) {
      const defaultData = getData(); // Get default data from local storage service

      const { error: insertError } = await supabase.from("player_data").insert({
        id: 1, // Use a fixed ID for the single player record
        data: defaultData,
      });

      if (insertError) throw insertError;
      console.log("Database initialized with default data");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Function to get player data
export const getPlayerData = async (): Promise<PlayerData> => {
  if (!isSupabaseConfigured()) {
    // Fallback to local storage if Supabase is not configured
    return getData();
  }

  try {
    const { data, error } = await supabase
      .from("player_data")
      .select("data")
      .eq("id", 1)
      .single();

    if (error) throw error;
    return data?.data as PlayerData;
  } catch (error) {
    console.error("Error fetching player data:", error);
    // Fallback to local storage if there's an error
    return getData();
  }
};

// Function to save player data
export const savePlayerData = async (data: PlayerData): Promise<boolean> => {
  // Always save to local storage as a backup
  saveData(data);

  if (!isSupabaseConfigured()) {
    return true; // Return success if only using local storage
  }

  try {
    const { error } = await supabase.from("player_data").upsert({
      id: 1, // Use a fixed ID for the single player record
      data: data,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving player data:", error);
    return false;
  }
};

// Function to subscribe to real-time updates
export const subscribeToPlayerData = (
  callback: (data: PlayerData) => void,
): (() => void) => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Real-time updates are disabled.");
    return () => {}; // Return empty function if Supabase is not configured
  }

  const subscription = supabase
    .channel("player_data_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "player_data",
        filter: "id=eq.1",
      },
      (payload) => {
        // When data changes, call the callback with the new data
        if (payload.new && payload.new.data) {
          callback(payload.new.data as PlayerData);
        }
      },
    )
    .subscribe();

  // Return a function to unsubscribe
  return () => {
    subscription.unsubscribe();
  };
};
