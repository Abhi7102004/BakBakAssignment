import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { AutoTable } from "@/components/auto";
import { api } from "../api";

export default function () {
  return (
    <Card className="p-4 w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Orders Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AutoTable 
          model={api.order} 
          columns={["orderId", "customerName", "totalPrice", "createdAt", "updatedAt"]} 
        />
      </CardContent>
    </Card>
  );
}