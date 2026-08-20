export interface Plan { name: string; price: number; specs: Array<{ label: string; value: string }>; }

export const plans: Plan[] = [
  { name: 'Eco', price: 15, specs: [{ label: 'Memory', value: '4 GB RAM' }, { label: 'Compute', value: '2 CPU cores' }, { label: 'Storage', value: '50 GB NVMe SSD' }] },
  { name: 'Starter', price: 35, specs: [{ label: 'Memory', value: '8 GB RAM' }, { label: 'Compute', value: '4 CPU cores' }, { label: 'Storage', value: '100 GB NVMe SSD' }] },
  { name: 'Standard', price: 45, specs: [{ label: 'Memory', value: '16 GB RAM' }, { label: 'Compute', value: '4 CPU cores' }, { label: 'Storage', value: '100 GB NVMe SSD' }] },
  { name: 'Premium', price: 95, specs: [{ label: 'Memory', value: '32 GB RAM' }, { label: 'Compute', value: '6 CPU cores' }, { label: 'Storage', value: '200 GB NVMe SSD' }] },
  { name: 'Business', price: 150, specs: [{ label: 'Memory', value: '64 GB RAM' }, { label: 'Compute', value: '10 CPU cores' }, { label: 'Storage', value: '200 GB NVMe SSD' }] },
  { name: 'Enterprise', price: 250, specs: [{ label: 'Memory', value: '128 GB RAM' }, { label: 'Compute', value: '12 CPU cores' }, { label: 'Storage', value: '300 GB NVMe SSD' }] },
];

export const capabilities = [['Compute', 'Intel Xeon E5-2690 v4 processors'], ['Storage', 'NVMe SSD storage'], ['Network', 'Port speed listed per plan'], ['Protection', 'Layer 4 DDoS protection']];

export const faqs = [
  { question: 'What does TuffRDP offer?', answer: 'TuffRDP provides fully automated VPS hosting with Windows and Linux options. Every server includes full root or administrator access.' },
  { question: 'What operating systems are available?', answer: 'Windows Server 2019, 2022, and 2025 are available alongside Ubuntu, Debian, CentOS, Rocky Linux, AlmaLinux, Fedora, and Kali Linux.' },
  { question: 'Do I get full root or admin access?', answer: 'Yes. Windows servers include administrator rights and Linux machines include root permissions.' },
  { question: 'Are servers delivered automatically?', answer: 'Servers are deployed automatically after payment confirmation. Login credentials are sent by email.' },
  { question: 'What payment methods do you accept?', answer: 'Credit and debit cards, PayPal, and cryptocurrencies are accepted.' },
  { question: 'What server locations are available?', answer: 'Our datacenter is located in Phoenix, Arizona, USA, ensuring optimal connectivity and latency.' },
];
