import React from "react";
import { Menu, Group, Portal, Sub, RadioGroup, Root, Trigger, SubTrigger, SubContent, Content, Item, CheckboxItem, RadioItem, Label, Separator } from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn("flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)}
    {...props}
  />
));

const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className)}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
));

const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground", className)}
    {...props}
  />
));

const MenubarContent = React.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn("z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground", className)}
      {...props}
    />
  </Portal>
));

const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground", inset && "pl-8", className)}
    {...props}
  />
));

export {
  Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem
};
