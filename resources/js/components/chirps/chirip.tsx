import { ChirpProps } from "@/types";
import { formatDistanceToNow } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Chirp({ chirp }: {chirp: ChirpProps}) {
    return (
        <Card className="my-4">
            <CardHeader>
                <CardTitle>{chirp.user.name}</CardTitle>
                <CardDescription>
                    {' '}
                    {formatDistanceToNow(new Date(chirp.created_at), { addSuffix: true })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{chirp.message}</p>
            </CardContent>
        </Card>
    );
}