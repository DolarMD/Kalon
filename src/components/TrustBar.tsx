import React from 'react';

export const TrustBar: React.FC = () => {
  const trustPoints = [
    { title: 'ENVÍO NACIONAL', desc: 'Rastreo directo a domicilio' },
    { title: 'ESTAMPILLADO DTF HD', desc: '300 DPI y tintas al agua' },
    { title: 'ALGODÓN HEAVYWEIGHT', desc: '240 a 420 GSM de alta caída' },
    { title: 'WHATSAPP DIRECTO', desc: 'Atención personalizada 1 a 1' },
  ];

  return (
    <section className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200 dark:divide-neutral-800 border-x border-neutral-200 dark:border-neutral-800">
          {trustPoints.map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 text-center flex flex-col justify-center"
            >
              <h4 className="text-[11px] font-bold tracking-widest text-neutral-950 uppercase dark:text-white">
                {item.title}
              </h4>
              <p className="mt-0.5 text-[10px] text-neutral-400 uppercase tracking-wider">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
