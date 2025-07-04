import { ChirpProps } from "@/types";

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
                    {new Date(chirp.created_at).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{chirp.message}</p>
            </CardContent>
        </Card>
    );
}