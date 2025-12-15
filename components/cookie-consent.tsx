"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-6"
        >
          <div className="max-w-lg mx-auto glass-card rounded-2xl p-5 shadow-glass">
            {!showSettings ? (
              <>
                {/* Main Banner */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">
                      Vi brukar cookies 🍪
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Me brukar cookies for å gje deg ei betre oppleving på sida vår. 
                      Nokre cookies er nødvendige for at sida skal fungera, medan andre 
                      hjelper oss å forstå korleis du brukar sida.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-light text-background font-medium"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Godta alle
                  </Button>
                  <Button
                    onClick={handleAcceptNecessary}
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/20 hover:bg-white/10"
                  >
                    Berre nødvendige
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-text-muted hover:text-text-primary"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Settings View */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Cookie-innstillingar
                  </h3>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="ghost"
                    size="icon"
                    className="text-text-muted hover:text-text-primary -mr-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Necessary */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div>
                      <p className="font-medium text-text-primary text-sm">Nødvendige</p>
                      <p className="text-xs text-text-muted">Krevjast for at sida skal fungera</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-accent/30 flex items-center justify-end px-1">
                      <div className="w-4 h-4 rounded-full bg-accent" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 w-full hover:bg-white/10 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-text-primary text-sm">Analyse</p>
                      <p className="text-xs text-text-muted">Hjelper oss forstå bruk av sida</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? "bg-accent/30 justify-end" : "bg-white/10 justify-start"
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors ${
                        preferences.analytics ? "bg-accent" : "bg-text-muted"
                      }`} />
                    </div>
                  </button>

                  {/* Marketing */}
                  <button
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 w-full hover:bg-white/10 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-text-primary text-sm">Marknadsføring</p>
                      <p className="text-xs text-text-muted">For relevante annonser</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.marketing ? "bg-accent/30 justify-end" : "bg-white/10 justify-start"
                    }`}>
                      <div className={`w-4 h-4 rounded-full transition-colors ${
                        preferences.marketing ? "bg-accent" : "bg-text-muted"
                      }`} />
                    </div>
                  </button>
                </div>

                {/* Save button */}
                <Button
                  onClick={handleSavePreferences}
                  className="w-full mt-4 bg-gradient-to-r from-primary to-primary-light text-background font-medium"
                >
                  Lagre innstillingar
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
