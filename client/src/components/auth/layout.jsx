import { LucideShoppingCart } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md w-full text-primary-foreground">
          <div className="flex items-center justify-center w-full">
            <LucideShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-white flex-shrink-0 mr-4" />

            <div className="text-left">
              <div className="uppercase text-sm md:text-base text-white/90 tracking-wide">
                Welcome to
              </div>
              <div className="text-white text-2xl md:text-4xl font-extrabold md:font-black leading-tight">
                ValueNest
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
