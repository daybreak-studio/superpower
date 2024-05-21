import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React from "react";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "form-widget": any;
    }
  }
}

export function ViralLoopsDialog({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const lenis = useLenis();

  return (
    <Dialog
      onOpenChange={(isOpen: boolean) => {
        if (isOpen) {
          lenis?.stop();
        } else {
          lenis?.start();
        }
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className="z-[200] ml-[10%] max-h-[90vh] w-[85%] overflow-x-visible md:max-w-xl"
        style={{ borderRadius: 32 }}
        data-lenis-prevent="true"
      >
        <div className="px-8 lg:px-12">
          <div className="-mt-6 overflow-hidden">
            <img
              src="/dialog-feature.png"
              className="-mt-14 mb-12 max-h-[550px] w-full rounded-3xl"
            />
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl lg:text-6xl">Get early access</h3>
              <p className="text-xl text-zinc-500">
                {
                  "Join the waitlist for early access to Superpower. We'll reach out to you as more spots become available."
                }
              </p>
            </div>
          </div>
          <div className="-ml-[15px] -mr-[15px]">
            <form-widget ucid="2X8NEjvQ9c5KJYR7178Sizt9pxM"></form-widget>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
