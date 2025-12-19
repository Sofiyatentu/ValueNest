import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDelete,
  handleEdit,
  setCurrentSelectedAddress,
  selectedId,
}) {
  console.log(selectedId, "selectedId");
  console.log(addressInfo);
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent
        className={`${
          selectedId?._id === addressInfo?._id ? "border-black" : null
        } p-4 gap-2 flex flex-col text-left`}
      >
        <Label className="block">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </Label>
        <Label className="block">
          City: <span className="font-normal">{addressInfo?.city}</span>
        </Label>
        <Label className="block">
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </Label>
        <Label className="block">
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </Label>
        <Label className="block">
          Notes: <span className="font-normal">{addressInfo?.notes}</span>
        </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
