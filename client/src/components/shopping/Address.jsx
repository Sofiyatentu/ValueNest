import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  function handleAddress(e) {
    e.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialFormData);
      toast("You can add max 3 addresses");
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialFormData);
            toast("Address edited successfully");
          }
        })
      : dispatch(addAddress({ ...formData, userId: user?.id })).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialFormData);
            toast("Address added successfully");
          }
        });
  }

  function handleDelete(addressInfo) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: addressInfo._id })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast("Address deleted successfully");
      }
    });
  }

  function handleEdit(addressInfo) {
    setCurrentEditedId(addressInfo?._id);
    setFormData({
      ...formData,
      address: addressInfo?.address,
      city: addressInfo?.city,
      pincode: addressInfo?.pincode,
      phone: addressInfo?.phone,
      notes: addressInfo?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  console.log(addressList);
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList?.length > 0
          ? addressList.map((item) => (
              <AddressCard
                addressInfo={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleAddress}
          isbtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
