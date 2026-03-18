"use client";

import Link from "next/link";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white dark:text-gray-50 font-bold text-lg mb-4">
              Locora
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Your window into what's happening in Brentwood right now. Discover
              events, places, and opportunities.
            </p>
          </div>
          <div>
            <h4 className="text-white dark:text-gray-50 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/events"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/places"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  Places
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white dark:text-gray-50 font-semibold mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white dark:text-gray-50 font-semibold mb-4">
              Follow
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white dark:hover:text-gray-50 transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            © 2026 Locora. Celebrating Brentwood's vibrant community.
          </p>
        </div>
      </div>
    </footer>
  );
}
