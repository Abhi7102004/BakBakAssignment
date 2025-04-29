import { AutoTable } from "@/components/auto";
import { api } from "../api";
import { useUser } from "@/lib/auth";

export default function OrdersIndex() {
  const { user, isLoading } = useUser();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Orders</h2>
        
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <AutoTable 
            model={api.order} 
            columns={[
              "orderId",
              "customerName", 
              "totalPrice",
              "createdAt"
            ]}
            filters={!user ? { public: true } : undefined}
          />
        )}
        
        {!user && !isLoading && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md text-blue-700">
            <p>Sign in to view all orders and additional details.</p>
          </div>
        )}
      </div>
    </div>
  );
}