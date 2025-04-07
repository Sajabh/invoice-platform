"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar1Icon } from "lucide-react";
import { useState } from "react";
import { date } from "zod";

const CreateInvoice = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Card className="w-full ms-auto ">
      <CardContent className="px-6 mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 items-center w-fit">
            <Badge variant={"secondary"}>Draft</Badge>
            <Input placeholder="text 123"></Input>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border vorder-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="text 123"
                ></Input>
              </div>
            </div>
            <div>
              <Label>Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Eruo -- EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" />
                <Input placeholder="Your Address" />
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input placeholder="Client Name" />
                <Input placeholder="Client Email" />
                <Input placeholder="Client Address" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start">
                  <Calendar1Icon />
                  {selectedDate ? (
                    <p>{selectedDate.toDateString()}</p>
                  ) : (
                    /*  new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long"}).format(selectedDate) */
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  fromDate={new Date()}
                  className="rounded-md border bg-muted shadow-md" // Add your custom styles here B)
                />
              </PopoverContent>
            </Popover>
          </div>
            <div className="flex flex-col gap-2">
              <Label>Invoice Due</Label>
              <Select>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select due date"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateInvoice;
