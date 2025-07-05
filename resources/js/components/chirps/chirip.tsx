import { useState } from "react";
import { ChirpProps, SharedData } from "@/types";
import { formatDistanceToNow } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from "../input-error";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, LoaderCircle, Pencil, Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function Chirp({ chirp }: {chirp: ChirpProps}) {

    const {auth} = usePage<SharedData>().props;

    const [editing, setEditing] = useState<boolean>(false);

    const { data, setData, patch, clearErrors, reset, errors, processing } = useForm<{ message: string }>({
        message: chirp.message,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('chirps.update', chirp.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <Card className="my-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-baseline">
                    <CardTitle>{chirp.user.name}</CardTitle>
                    <span className="mx-1 text-gray-400">&middot;</span>
                    <div className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(chirp.created_at), { addSuffix: true })}</div>
                    {chirp.created_at !== chirp.updated_at ? (
                        <>
                            <span className="mx-1 text-gray-400">&middot;</span>
                            <div className="text-sm text-muted-foreground">Edited</div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                {auth.user?.id === chirp.user.id && (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} size={'icon'} className="rounded-full">
                                <EllipsisVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setEditing(!editing);
                                }}
                            >
                                <Pencil className="mr-2" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="items-center text-destructive" asChild>
                                <Link method="delete" href={route('chirps.destroy', chirp.id)} className="w-full">
                                    <Trash className="mr-2 text-destructive" />
                                    <span>Delete</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </CardHeader>
            <CardContent>
                {editing ? (
                    <form onSubmit={submit}>
                        <Textarea value={data.message} onChange={(e) => setData('message', e.target.value)}></Textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save
                            </Button>
                            <Button
                                className="mt-4"
                                variant="secondary"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <p>{chirp.message}</p>
                )}
            </CardContent>
        </Card>
    );
}