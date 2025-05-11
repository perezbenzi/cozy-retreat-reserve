
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="mt-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="container-custom max-w-lg text-center py-16">
          <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! The page you're looking for cannot be found.
          </p>
          <p className="text-muted-foreground mb-8">
            The page may have been moved, deleted, or it never existed.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <Button size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
