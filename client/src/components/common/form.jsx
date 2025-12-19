import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isbtnDisabled,
}) {
  function renderInput(item) {
    let element = null;
    const value = formData[item.name] || "";
    switch (item.componentType) {
      case "input":
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
            required={true}
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [item.name]: value })
            }
            value={value}
          >
            <SelectTrigger>
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        {formControls.map((item) => (
          <div key={item.id} className="mb-4 text-left w-full">
            <Label className="block mb-1 text-sm text-foreground">
              {item.label}
            </Label>
            {renderInput(item)}
          </div>
        ))}
      </div>

      <Button className="w-full mt-2" disabled={isbtnDisabled} type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
export default CommonForm;
