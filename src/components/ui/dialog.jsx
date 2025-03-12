import React from "react";
import { Root, Trigger, Portal, Close, Overlay, Content } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogClose = Close;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn("fixed left-50 top-50 translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-lg border bg-background p-6 shadow-lg", className)}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </DialogPortal>
));

export { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose, DialogContent };
