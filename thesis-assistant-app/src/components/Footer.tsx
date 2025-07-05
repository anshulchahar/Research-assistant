import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t p-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Thesis Research Assistant. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
