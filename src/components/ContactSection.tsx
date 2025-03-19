import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Send,
  AlertCircle,
} from "lucide-react";
import { getWhatsAppNumber } from "./admin/AuthService";

interface ContactSectionProps {
  playerName?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  qrCodeUrl?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  playerName = "Cristiano Silva",
  email = "contato@cristianosilva.com",
  phone = "+55 11 99999-9999",
  socialLinks = {
    facebook: "https://facebook.com/cristianosilva",
    instagram: "https://instagram.com/cristianosilva",
    twitter: "https://twitter.com/cristianosilva",
    linkedin: "https://linkedin.com/in/cristianosilva",
  },
  qrCodeUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=playerQRCode",
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50" id="contact">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
          Entre em Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Envie uma Proposta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium">
                    Organização/Clube
                  </label>
                  <Input
                    id="organization"
                    placeholder="Nome da sua organização ou clube"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Detalhes da sua proposta para o jogador"
                    rows={4}
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    const nameValue =
                      (document.getElementById("name") as HTMLInputElement)
                        ?.value || "";
                    const emailValue =
                      (document.getElementById("email") as HTMLInputElement)
                        ?.value || "";
                    const orgValue =
                      (
                        document.getElementById(
                          "organization",
                        ) as HTMLInputElement
                      )?.value || "";
                    const msgValue =
                      (
                        document.getElementById(
                          "message",
                        ) as HTMLTextAreaElement
                      )?.value || "";

                    const text = `Nome: ${nameValue}\nEmail: ${emailValue}\nOrganização: ${orgValue}\nMensagem: ${msgValue}`;
                    const encodedText = encodeURIComponent(text);

                    // Get WhatsApp number from localStorage or use default
                    let whatsappNumber = "5521977434614";
                    try {
                      const authData = localStorage.getItem("adminAuthData");
                      if (authData) {
                        const parsedData = JSON.parse(authData);
                        if (parsedData.whatsappNumber) {
                          whatsappNumber = parsedData.whatsappNumber;
                        }
                      }
                    } catch (error) {
                      console.error("Error getting WhatsApp number:", error);
                    }

                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${encodedText}`,
                      "_blank",
                    );
                  }}
                >
                  <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <span>{phone}</span>
                </div>

                <Separator className="my-4" />

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <p className="text-sm text-slate-600 mb-3">
                    Escaneie para cartão digital
                  </p>
                  <div className="border-4 border-white shadow-md rounded-lg overflow-hidden w-40 h-40">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code para cartão digital"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Redes Sociais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white hover:opacity-90 transition-opacity"
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Instagram</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-400 p-3 rounded-full text-white hover:opacity-90 transition-opacity"
                        >
                          <Twitter className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Twitter</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 p-3 rounded-full text-white hover:opacity-90 transition-opacity"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Facebook</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-700 p-3 rounded-full text-white hover:opacity-90 transition-opacity"
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>LinkedIn</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mt-6 text-center text-sm text-slate-600">
                  <p className="flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Siga {playerName} para atualizações e conteúdo exclusivo
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
