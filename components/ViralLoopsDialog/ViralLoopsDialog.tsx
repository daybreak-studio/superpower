import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React from "react";
import { X } from "lucide-react";

export function ViralLoopsDialog({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent
                className="overflow-y-scoll z-[200] ml-[10%] max-h-[90vh] w-[85%] md:max-w-xl"
                style={{ borderRadius: 32 }}
            >
                <DialogClose
                    className="absolute left-0 z-[200] rounded-full rounded-sm p-4 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none data-[state=open]:text-slate-500 md:-left-20"
                    style={{ backgroundColor: "white", borderRadius: "100%" }}
                >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </DialogClose>
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
                        <p className="text-xl">
                            Share your personal link to move up the waitlist when your friends
                            sign up.
                        </p>
                    </div>
                    <div className="-ml-[15px] -mr-[15px]">
                        <form-widget ucid="2X8NEjvQ9c5KJYR7178Sizt9pxM"></form-widget>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
