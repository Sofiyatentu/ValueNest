import { ChartNoAxesCombined } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSideBarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            open ? setOpen(false) : null;
          }}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle>
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems open={open} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-backgroundp-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer item-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h4 className="text-2xl font-extrabold">Admin Panel</h4>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
