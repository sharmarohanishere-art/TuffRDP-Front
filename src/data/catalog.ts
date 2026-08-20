export interface OperatingSystem { name: string; family: 'Linux' | 'Windows'; icon: string; recommended?: boolean; }

export const operatingSystems: OperatingSystem[] = [
  { name: 'Ubuntu 24.04', family: 'Linux', icon: '/images/icon-ubuntu-DeLceYK-.svg', recommended: true },
  { name: 'Debian 12', family: 'Linux', icon: '/images/icon-debian-C0B5Cd-E.svg' },
  { name: 'AlmaLinux 9', family: 'Linux', icon: '/images/icon-almalinux-CIAhjp2f.svg' },
  { name: 'Rocky Linux 9', family: 'Linux', icon: '/images/icon-rockylinux-DN5D-07J.svg' },
  { name: 'Fedora 39', family: 'Linux', icon: '/images/icon-fedora-6rdO8zAa.svg' },
  { name: 'Windows Server 2025', family: 'Windows', icon: '/images/icon-windows-B94qRA1N.svg', recommended: true },
  { name: 'Windows Server 2022', family: 'Windows', icon: '/images/icon-windows-B94qRA1N.svg' },
  { name: 'Windows Server 2019', family: 'Windows', icon: '/images/icon-windows-B94qRA1N.svg' },
];
