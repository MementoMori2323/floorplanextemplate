import { Stack, Group, Button, ActionIcon, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDesk, IconDeviceDesktop, IconDeviceLaptop, IconBuilding, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { supabase } from '@/Supabase/supabaseclient';

export default function NavbarSection() {
  const isMobile = useMediaQuery('(max-width: 760px)');

  const router = useRouter(); // Use the useRouter hook here

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      router.push('/');
    }
  };

  return (
    <>
        {isMobile ? (
          <Stack m={10} justify="space-between" align="stretch" style={{ height: '100%' }} bg="var(--mantine-color-body)">
            <Stack>
              <Button variant="subtle" color="black" rightSection={<IconDesk size={20} />}>UPDATE WORKSTATION</Button>
              <Button variant="subtle" color="black" rightSection={<IconDeviceDesktop size={20} />}>UPDATE MONITORS</Button>
              <Button variant="subtle" color="black" rightSection={<IconDeviceLaptop size={20} />}>UPDATE COMPUTERS</Button>
              <Button variant="subtle" color="black" rightSection={<IconBuilding size={20} />}>UPDATE OFFICES</Button>
            </Stack>
            <Stack>
              <Button variant="subtle" color="black" rightSection={<IconLogout size={20} onClick={handleSignOut} />}>LOG OUT</Button>
            </Stack>
          </Stack>
        ) : (
          <Stack m={10} justify="space-between" style={{ height: '100%' }} bg="var(--mantine-color-body)">
            <Group justify="center">
                <Tooltip label="Update Workstations" transitionProps={{ transition: 'fade-right', duration: 300 }} position="right" offset={5}>
                  <ActionIcon size="xl" variant="subtle" color="black">
                    <IconDesk />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Update Monitors" transitionProps={{ transition: 'fade-right', duration: 300 }} position="right" offset={5}>
                  <ActionIcon size="xl" variant="subtle" color="black">
                    <IconDeviceDesktop />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Update Computers" transitionProps={{ transition: 'fade-right', duration: 300 }} position="right" offset={5}>
                  <ActionIcon size="xl" variant="subtle" color="black">
                    <IconDeviceLaptop />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Update Offices" transitionProps={{ transition: 'fade-right', duration: 300 }} position="right" offset={5}>
                  <ActionIcon size="xl" variant="subtle" color="black">
                    <IconBuilding />
                  </ActionIcon>
                </Tooltip>
            </Group>
            <Group justify="center">
              <Tooltip label="Update Offices" transitionProps={{ transition: 'fade-right', duration: 300 }} position="right" offset={5}>
                <ActionIcon size="xl" variant="subtle" color="black" onClick={handleSignOut}>
                  <IconLogout />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        )}
    </>
  );
}
