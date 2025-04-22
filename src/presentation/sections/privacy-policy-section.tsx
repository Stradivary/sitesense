"use client";
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../components/atoms/dialog';

const PrivacyPolicySection: React.FC = () => {
    const t = useTranslations("SiteFooter");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger className="hover:text-white p-0">
                    {t("privacyPolicy")}
                </DialogTrigger>
                <DialogContent className='bg-white p-4'>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus cumque corporis a mollitia beatae rem similique quia. Voluptatibus eos, dignissimos quos ad deserunt tempore praesentium cum officiis esse ex nostrum!
                        Sit rerum minima iure reprehenderit veritatis veniam rem atque, dicta delectus corrupti! Temporibus sint fugit dicta, saepe eveniet exercitationem nemo nam, ex, quae a iste eligendi debitis. Quia, error laudantium!
                        Maxime, voluptates! Iusto, culpa. Ut quibusdam amet minus similique labore mollitia numquam sed reprehenderit delectus officiis! Culpa odit error qui accusantium aperiam illum quasi exercitationem necessitatibus? Aliquam quas exercitationem unde.
                        Nulla eum consequatur quidem, suscipit officia, quae dolorem pariatur sit facere eius tempore iste totam molestiae amet sunt. Voluptatibus quos aliquam vero quisquam nemo dicta adipisci quasi deserunt excepturi molestiae.

                    </DialogDescription>
                    <DialogClose>
                        Close
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PrivacyPolicySection; 