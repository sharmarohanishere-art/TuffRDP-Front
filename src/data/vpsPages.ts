export interface VpsPageData {
  id: string; // The URL slug part (e.g., 'ubuntu', 'centos')
  name: string; // Display name
  title: string; // Meta title
  description: string; // Meta description
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  icon: string | null; // Path to OS logo SVG
}

export const vpsPages: VpsPageData[] = [
  {
    id: 'linux',
    name: 'Linux',
    title: 'Linux VPS Hosting',
    description: 'Deploy a high-performance Linux virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Linux / Virtual Private Server',
    heroHeading: 'Linux VPS built for modern workloads.',
    heroDescription: 'Root access to a dedicated Linux instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: null, // Generic Linux
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    title: 'Ubuntu VPS Hosting',
    description: 'Deploy a high-performance Ubuntu virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Ubuntu / Virtual Private Server',
    heroHeading: 'Ubuntu VPS built for modern workloads.',
    heroDescription: 'Root access to a dedicated Ubuntu instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-ubuntu-DeLceYK-.svg',
  },
  {
    id: 'centos',
    name: 'CentOS',
    title: 'CentOS VPS Hosting',
    description: 'Deploy a high-performance CentOS virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'CentOS / Virtual Private Server',
    heroHeading: 'CentOS VPS built for enterprise stability.',
    heroDescription: 'Root access to a dedicated CentOS instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-centos-B7RigxN-.svg',
  },
  {
    id: 'debian',
    name: 'Debian',
    title: 'Debian VPS Hosting',
    description: 'Deploy a high-performance Debian virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Debian / Virtual Private Server',
    heroHeading: 'Debian VPS built for rock-solid reliability.',
    heroDescription: 'Root access to a dedicated Debian instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-debian-C0B5Cd-E.svg',
  },
  {
    id: 'fedora',
    name: 'Fedora',
    title: 'Fedora VPS Hosting',
    description: 'Deploy a high-performance Fedora virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Fedora / Virtual Private Server',
    heroHeading: 'Fedora VPS built for cutting-edge deployments.',
    heroDescription: 'Root access to a dedicated Fedora instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-fedora-6rdO8zAa.svg',
  },
  {
    id: 'oracle',
    name: 'Oracle Linux',
    title: 'Oracle Linux VPS Hosting',
    description: 'Deploy a high-performance Oracle Linux virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Oracle Linux / Virtual Private Server',
    heroHeading: 'Oracle Linux VPS built for enterprise workloads.',
    heroDescription: 'Root access to a dedicated Oracle Linux instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: null, // We don't have an Oracle icon in public/images
  },
  {
    id: 'almalinux',
    name: 'AlmaLinux',
    title: 'AlmaLinux VPS Hosting',
    description: 'Deploy a high-performance AlmaLinux virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'AlmaLinux / Virtual Private Server',
    heroHeading: 'AlmaLinux VPS built for CentOS alternatives.',
    heroDescription: 'Root access to a dedicated AlmaLinux instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-almalinux-CIAhjp2f.svg',
  },
  {
    id: 'rocky-linux',
    name: 'Rocky Linux',
    title: 'Rocky Linux VPS Hosting',
    description: 'Deploy a high-performance Rocky Linux virtual private server with root access, NVMe storage, and Intel Xeon compute.',
    heroBadge: 'Rocky Linux / Virtual Private Server',
    heroHeading: 'Rocky Linux VPS built for seamless migration.',
    heroDescription: 'Root access to a dedicated Rocky Linux instance—Intel Xeon compute, NVMe storage, and a protected network, ready the moment deployment completes.',
    icon: '/images/icon-rockylinux-DN5D-07J.svg',
  },
];
