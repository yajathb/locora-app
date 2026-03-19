"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface LocationContextType {
  city: string;
  state: string;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationContextType>({
    city: "Brentwood",
    state: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get user location on client side only
    if (typeof navigator === "undefined") return;

    const getUserLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject),
        );

        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );
        const data = await response.json();

        setLocation({
          city:
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Brentwood",
          state: data.address.state || "",
        });
      } catch (error) {
        console.error("Failed to get location:", error);
        setLocation({ city: "Brentwood", state: "" });
      }
    };

    getUserLocation();
    setMounted(true);
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
}
