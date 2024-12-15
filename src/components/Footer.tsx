import React from "react";

export function Footer() {
  return (
    <footer className="mt-8 py-4 bg-gray-100 border-t text-center text-gray-600">
      <p className="text-sm">
        © {new Date().getFullYear()}
        {" – "}
        <a href="https://github.com/loaymoolb" target="blank">
          loaymoolb
        </a>
        {". "}
        All rights reserved.
      </p>
    </footer>
  );
}
