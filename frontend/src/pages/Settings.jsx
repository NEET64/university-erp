import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const StudentSettings = () => {
  const timeZones = [
    "American Samoa",
    "Antarctica/Casey",
    "Argentina/Buenos_Aires",
    "Australia/Sydney",
    "Austria/Vienna",
    "Bahamas/Nassau",
    "Bangladesh",
    "Belgium/Brussels",
    "Brazil/Sao_Paulo",
    "Canada/Toronto",
    "Chile/Santiago",
    "China/Shanghai",
    "Colombia",
    "Croatia/Zagreb",
    "Czech Republic/Prague",
    "Denmark/Copenhagen",
    "Egypt",
    "Fiji",
    "Finland/Helsinki",
    "France/Paris",
    "Germany/Berlin",
    "Greece/Athens",
    "Hong Kong",
    "India",
    "Indonesia/Jakarta",
    "Iran/Tehran",
    "Iraq",
    "Ireland/Dublin",
    "Israel/Jerusalem",
    "Italy/Rome",
    "Japan/Tokyo",
    "Jordan",
    "Kenya",
    "South Korea",
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="px-2">
      <Header title="Settings" />
      <div className="w-[50%] flex flex-col gap-2 ">
        <h3 className="text-xl text-white font-medium mt-2">Emails</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Assignment Emails</Label>
              <p>Receive emails about assignments and deadlines.</p>
            </div>
            <Switch
              className="data-[state=checked]:bg-violet-500"
              aria-readonly
            />
          </div>
          <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Security Emails</Label>
              <p>Receive emails about account security updates.</p>
            </div>
            <Switch
              className="data-[state=checked]:bg-violet-500"
              aria-readonly
            />
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <h3 className="text-xl text-white font-medium mt-2">Notifications</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Attendance Notifications</Label>
              <p>Receive notifications about attendance-related updates.</p>
            </div>
            <Switch className="data-[state=checked]:bg-violet-500" />
          </div>
          <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Events Notifications</Label>
              <p>Receive notifications about upcoming events and activities.</p>
            </div>
            <Switch
              className="data-[state=checked]:bg-violet-500"
              aria-readonly
            />
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <h3 className="text-xl text-white font-medium mt-2">Time Zone</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Local Time Zone</Label>
              <p>Set your local time zone for accurate time representation.</p>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between text-sm font-medium">
                  {value
                    ? timeZones.find((timeZone) => timeZone === value)
                    : "Select Time Zone..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandGroup>
                      {timeZones.map((timeZone) => (
                        <CommandItem
                          key={timeZone}
                          value={timeZone}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}>
                          {timeZone}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Button className="bg-white text-violet-500 hover:bg-violet-100 mt-5 w-28">
        Save Changes
      </Button>
    </div>
  );
};
