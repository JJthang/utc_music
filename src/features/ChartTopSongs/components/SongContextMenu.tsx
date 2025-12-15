import React, { useState } from 'react';
import {
  Menu,
  MenuList,
  MenuItem,
  Divider,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';
import {
  Heart,
  Headphones,
  Music,
  Ban,
  ListPlus,
  Play,
  Radio,
  PlusCircle,
  Link2,
  Share2,
  ChevronRight,
} from 'lucide-react';
import type { Song } from '@/types/song.type';
import { formatNumber } from '@/utils/format';

interface SongContextMenuProps {
  song: Song;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onAddToPlaylist?: (song: Song) => void;
  onPlayNext?: (song: Song) => void;
  onPlaySimilar?: (song: Song) => void;
  onCopyLink?: (song: Song) => void;
  onShare?: (song: Song) => void;
  onBlock?: (song: Song) => void;
  onShowLyrics?: (song: Song) => void;
}

const SongContextMenu: React.FC<SongContextMenuProps> = ({
  song,
  anchorEl,
  open,
  onClose,
  onAddToPlaylist,
  onPlayNext,
  onPlaySimilar,
  onCopyLink,
  onShare,
  onBlock,
  onShowLyrics,
}) => {
  const [likes] = useState(Math.floor(Math.random() * 10000) + 1000); // Simulate likes for demo

  const menuItems = [
    {
      icon: ListPlus,
      label: 'Thêm vào danh sách phát',
      onClick: () => {
        onAddToPlaylist?.(song);
        onClose();
      },
    },
    {
      icon: Play,
      label: 'Phát tiếp theo',
      onClick: () => {
        onPlayNext?.(song);
        onClose();
      },
    },
    {
      icon: Radio,
      label: 'Phát nội dung tương tự',
      onClick: () => {
        onPlaySimilar?.(song);
        onClose();
      },
    },
    {
      icon: PlusCircle,
      label: 'Thêm vào playlist',
      onClick: () => {
        onAddToPlaylist?.(song);
        onClose();
      },
    },
    {
      icon: Link2,
      label: 'Sao chép link',
      onClick: () => {
        onCopyLink?.(song);
        onClose();
      },
    },
    {
      icon: Share2,
      label: 'Chia sẻ',
      onClick: () => {
        onShare?.(song);
        onClose();
      },
      hasArrow: true,
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          bgcolor: 'var(--color-bg-secondary)',
          borderRadius: 3,
          border: '1px solid var(--color-bg-tertiary)',
          width: 320,
          maxWidth: 'calc(100vw - 20px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
          mt: 0.5,
        },
      }}
      MenuListProps={{
        sx: {
          p: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid var(--color-bg-tertiary)',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          {/* Album Art */}
          <Box
            component="img"
            src={song.coverUri || '/placeholder.svg'}
            alt={song.title}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />

          {/* Song Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '1rem',
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {song.title}
            </Typography>
            {/* Metrics */}
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Heart size={16} color="white" />
                <Typography
                  variant="caption"
                  sx={{ color: 'white', fontSize: '0.875rem' }}
                >
                  {formatNumber(likes)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Headphones size={16} color="white" />
                <Typography
                  variant="caption"
                  sx={{ color: 'white', fontSize: '0.875rem' }}
                >
                  {formatNumber(song.views)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          p: 1,
          borderBottom: '1px solid var(--color-bg-tertiary)',
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            startIcon={<Music size={16} />}
            onClick={() => {
              onShowLyrics?.(song);
              onClose();
            }}
            sx={{
              bgcolor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)',
              fontSize: '0.875rem',
              py: 1,
              '&:hover': {
                bgcolor: 'var(--color-bg-quaternary)',
              },
            }}
          >
            Lời bài hát
          </Button>
          <Button
            fullWidth
            startIcon={<Ban size={16} />}
            onClick={() => {
              onBlock?.(song);
              onClose();
            }}
            sx={{
              bgcolor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)',
              fontSize: '0.875rem',
              py: 1,
              '&:hover': {
                bgcolor: 'var(--color-bg-quaternary)',
              },
            }}
          >
            Chặn
          </Button>
        </Stack>
      </Box>

      {/* Menu Items */}
      <MenuList
        sx={{
          py: 0.5,
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.onClick}
            sx={{
              px: 2,
              py: 1.25,
              color: 'white',
              fontSize: '0.875rem',
              '&:hover': {
                bgcolor: 'var(--color-bg-tertiary)',
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <item.icon size={20} color="white" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: 'white',
                }}
              >
                {item.label}
              </Typography>
              {item.hasArrow && (
                <ChevronRight size={16} color="white" />
              )}
            </Stack>
          </MenuItem>
        ))}
      </MenuList>

      {/* Footer */}
      <Divider sx={{ borderColor: '#334155' }} />
      <Box
        sx={{
          px: 2,
          py: 1.5,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'var(--color-text-gray)',
            fontSize: '0.75rem',
          }}
        >
          Cung cấp bởi Ingrooves Music Group
        </Typography>
      </Box>
    </Menu>
  );
};

export default SongContextMenu;
