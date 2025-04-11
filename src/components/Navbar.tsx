
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-border py-4">
      <div className="container max-w-7xl mx-auto px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-accent rounded-md p-1">
            <Youtube size={24} className="text-background" />
          </div>
          <h1 className="text-xl font-bold">YouTube Curator</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
