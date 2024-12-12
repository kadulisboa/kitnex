// src/components/InfoModal.tsx
"use client";

import { Globe, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { Whatsapp } from "../icons/whatsapp";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
          style={{
            animation: "fadeIn 0.2s ease-out",
          }}
        />

        {/* Modal */}
        <div
          className="bg-white rounded-lg w-full max-w-md p-6 relative z-10"
          style={{
            animation: "scaleUp 0.2s ease-out",
          }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Suporte</h3>
              <Link
                href={"mailto:suporte@bylisboa.tech"}
                className="text-sm text-gray-500 mt-1 flex items-center gap-2 hover:underline"
              >
                <Mail size={18} />
                suporte@bylisboa.tech
              </Link>
              <Link
                href={
                  "https://api.whatsapp.com/send?phone=5511930758232&text=Ol%C3%A1%2C%20quero%20ajuda%20com%20o%20Kitnex!"
                }
                className="text-sm text-gray-500 mt-1 flex items-center gap-2 hover:underline"
              >
                <Whatsapp size={18} />
                (11) 93075-8232
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sistema</h3>
              <p className="text-sm text-gray-500 mt-1">Versão: 0.1.0 (Beta)</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Desenvolvido por
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href="https://bylisboa.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <Globe size={18} />
                  lisboa.tech
                </Link>
                <Link
                  href="https://instagram.com/bylisboa.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <Instagram size={18} />
                  @bylisboa.tech
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scaleUp {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
