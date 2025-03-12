import React from "react";
import { Root as DrawerRoot, Trigger, Portal, Close, Overlay, Content } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
  <DrawerRoot
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

const DrawerTrigger = Trigger;
const DrawerPortal = Portal;
const DrawerClose = Close;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <Content
      ref={ref}
      className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className)}
      {...props}
    >
      {children}
    </Content>
  </DrawerPortal>
));

export { Drawer, DrawerTrigger, DrawerPortal, DrawerClose, DrawerOverlay, DrawerContent };
