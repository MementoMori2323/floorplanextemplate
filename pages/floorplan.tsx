'use client';

import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react'; // Import useContext
import { UserDataContext } from '@/pages/_app'; // Adjust the path to where your App component is located
import ArtixLogo from '@/components/images/Reportz Logo.png';
import NavbarSection from '@/components/Navbar/Navbar';
import SmplrSpaceViewer from '@/components/Viewer/viewer';

export default function FloorPlan() {
  const [opened, { toggle }] = useDisclosure();

  // Use the context to get user metadata
  const userMetadata = useContext(UserDataContext);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Image src={ArtixLogo.src} alt="Reportz Logo" style={{ height: 60 }} />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSection />
      </AppShell.Navbar>
      <AppShell.Main>
        <SmplrSpaceViewer />
      </AppShell.Main>
    </AppShell>
  );
}
