// lib/delivery/geocode.ts
// Converts a text address to lat/lng.
// Uses Google Geocoding API if GOOGLE_MAPS_API_KEY is set,
// otherwise falls back to nominatim (free, no key required).

import type { LatLng } from "./types";

export async function geocodeAddress(address: string): Promise<LatLng> {
  if (process.env.GOOGLE_MAPS_API_KEY) {
    return geocodeGoogle(address);
  }
  return geocodeNominatim(address);
}

// ─── Google Geocoding ─────────────────────────────────────────────────────────

async function geocodeGoogle(address: string): Promise<LatLng> {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("key", process.env.GOOGLE_MAPS_API_KEY!);
  url.searchParams.set("region", "UG"); // bias results to Uganda

  const res  = await fetch(url.toString());
  const data = await res.json();

  if (data.status !== "OK" || !data.results?.[0]) {
    throw new Error(`Geocoding failed: ${data.status} — "${address}"`);
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

// ─── Nominatim fallback (OpenStreetMap, free) ─────────────────────────────────

async function geocodeNominatim(address: string): Promise<LatLng> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address + ", Uganda");
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ug");

  const res  = await fetch(url.toString(), {
    headers: { "User-Agent": "Zuria/1.0 (zuria.maxnovate.com)" },
  });
  const data = await res.json();

  if (!data?.[0]) {
    throw new Error(`Geocoding failed (Nominatim): no results for "${address}"`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
