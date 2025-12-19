// import banner1 from "../../assets/banner1.webp";

import Address from "@/components/shopping/Address";
import ShoppingOrders from "@/components/shopping/Orders";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Account() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Account;
