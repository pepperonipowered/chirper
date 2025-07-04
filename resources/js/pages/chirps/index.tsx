
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ChirpProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Chirp from '@/components/chirps/chirip';

 const breadcrumbs: BreadcrumbItem[] = [
     {
         title: 'Chirps',
         href: '/chirps',
     },
 ];
export default function ChirpsPage({ chirps }: { chirps: ChirpProps[] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
 
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chirps" />
            <div className="mx-auto max-w-2xl w-full p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <Textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                        onChange={(e) => setData('message', e.target.value)}
                    ></Textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <Button className="mt-4" disabled={processing}>
                        Chirp
                    </Button>
                </form>

                <div className="mt-6 shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}