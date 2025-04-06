'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaGamepad, FaMusic, FaVideo, FaClock } from 'react-icons/fa';
import { SiSpotify } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi';
import { RiRocketFill } from 'react-icons/ri';
import { FaGem } from 'react-icons/fa';
import Image from 'next/image';

interface LanyardData {
  data: {
    discord_user: {
      avatar: string;
      discriminator: string;
      id: string;
      username: string;
      public_flags?: number;
      premium_type?: number;
    };
    discord_status: string;
    activities: Array<{
      name: string;
      state?: string;
      details?: string;
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
      timestamps?: {
        start?: number;
        end?: number;
      };
      type: number;
      application_id?: string;
    }>;
  };
}

// Badge flags from Discord API
enum DiscordFlags {
  ACTIVE_DEVELOPER = 1 << 22,
  HOUSE_BRILLIANCE = 1 << 7
}

// Premium types
enum PremiumType {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
  NITRO_BASIC = 3
}

export default function DiscordStatus() {
  const [discordData, setDiscordData] = useState<LanyardData['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/263957712507895808');
        const data = await response.json();
        
        if (data.success) {
          if (!data.data.discord_user.public_flags) {
            data.data.discord_user.public_flags = DiscordFlags.ACTIVE_DEVELOPER | DiscordFlags.HOUSE_BRILLIANCE;
          }
          
          if (!data.data.discord_user.premium_type) {
            data.data.discord_user.premium_type = PremiumType.NITRO;
          }
          
          setDiscordData(data.data);
        }
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!discordData) return;

    const currentActivity = discordData.activities?.find(a => a.type === 0 || a.type === 2 || a.type === 3);
    if (!currentActivity?.timestamps?.start) return;

    const updateElapsedTime = () => {
      const startTime = currentActivity.timestamps?.start;
      if (!startTime) return;
      
      const now = Date.now();
      const elapsed = now - startTime;
      
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      
      setElapsedTime(hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`);
    };

    updateElapsedTime();
    const timer = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(timer);
  }, [discordData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500 dark:bg-green-400';
      case 'idle': return 'bg-yellow-500 dark:bg-yellow-400';
      case 'dnd': return 'bg-red-500 dark:bg-red-400';
      default: return 'bg-gray-500 dark:bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'idle': return 'Idle';
      case 'dnd': return 'Do Not Disturb';
      default: return 'Offline';
    }
  };

  const getActivityIcon = (type: number, name: string) => {
    if (name.toLowerCase() === 'spotify') return SiSpotify;
    switch (type) {
      case 0: return FaGamepad;
      case 2: return FaMusic;
      case 3: return FaVideo;
      default: return FaDiscord;
    }
  };

  const getActivityType = (type: number, name: string) => {
    if (name.toLowerCase() === 'spotify') return 'Listening to Spotify';
    switch (type) {
      case 0: return 'Playing';
      case 1: return 'Streaming';
      case 2: return 'Listening to';
      case 3: return 'Watching';
      default: return '';
    }
  };

  const getUserBadges = (flags?: number, premiumType?: number) => {
    const badges = [];
    
    if (flags) {
      if (flags & DiscordFlags.ACTIVE_DEVELOPER) {
        badges.push({
          id: 'active_dev',
          name: 'Active Developer',
          icon: RiRocketFill,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20'
        });
      }
      if (flags & DiscordFlags.HOUSE_BRILLIANCE) {
        badges.push({
          id: 'brilliance',
          name: 'HypeSquad Brilliance',
          icon: HiSparkles,
          color: 'text-pink-400',
          bgColor: 'bg-pink-500/20'
        });
      }
    }
    
    if (premiumType === PremiumType.NITRO || premiumType === PremiumType.NITRO_CLASSIC) {
      badges.push({
        id: 'nitro',
        name: 'Discord Nitro',
        icon: FaGem,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20'
      });
    }

    return (
      <div className="flex gap-1.5 items-center">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`w-5 h-5 rounded-md ${badge.bgColor} flex items-center justify-center group/badge relative cursor-help transition-transform hover:scale-110`}
          >
            <badge.icon className={`w-3 h-3 ${badge.color}`} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded pointer-events-none opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap">
              {badge.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!discordData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-4 rounded-xl bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 dark:border-white/20"></div>
        </div>
      </motion.div>
    );
  }

  const { discord_user, discord_status, activities } = discordData;
  
  const isGif = discord_user.avatar?.startsWith('a_');
  const avatarUrl = discord_user.avatar 
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${isGif ? 'gif' : 'webp'}?size=256`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(discord_user.discriminator) % 5}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md p-4 rounded-xl bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/10 shadow-lg"
    >
      <div className="space-y-4">
        {/* User Info Section */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <Image
              src={avatarUrl}
              alt="Discord Avatar"
              width={64}
              height={64}
              className="rounded-full ring-2 ring-gray-200/50 dark:ring-white/10"
              unoptimized={isGif}
            />
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${getStatusColor(discord_status)} ring-2 ring-white dark:ring-black/50`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {discord_user.username}
              </span>
              {getUserBadges(discord_user.public_flags, discord_user.premium_type)}
            </div>
            <div className="text-gray-600 dark:text-white/60 text-sm mt-1">
              {getStatusText(discord_status)}
            </div>
          </div>
        </div>

        {/* Activity Section */}
        {activities?.find(a => a.type === 0 || a.type === 2 || a.type === 3) && (
          <div className="bg-gray-200/50 dark:bg-black/20 rounded-lg p-3 space-y-3">
            {activities
              .filter(activity => activity.type === 0 || activity.type === 2 || activity.type === 3)
              .map((activity, index) => {
                const Icon = getActivityIcon(activity.type, activity.name);
                const isSpotify = activity.name.toLowerCase() === 'spotify';
                const albumArt = isSpotify && activity.assets?.large_image
                  ? `https://i.scdn.co/image/${activity.assets.large_image.substring(8)}`
                  : null;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      {isSpotify && albumArt ? (
                        <div className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden shadow-sm">
                          <Image
                            src={albumArt}
                            alt="Album Art"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-white/80">
                          <Icon className={`w-4 h-4 ${isSpotify ? 'text-[#1DB954]' : ''}`} />
                          <span className="text-sm">{getActivityType(activity.type, activity.name)}</span>
                        </div>
                        <div className="text-gray-900 dark:text-white font-medium truncate">{activity.name}</div>
                        {activity.details && (
                          <div className="text-sm text-gray-600 dark:text-white/60 truncate">{activity.details}</div>
                        )}
                        {activity.state && (
                          <div className="text-sm text-gray-600 dark:text-white/60 truncate">{activity.state}</div>
                        )}
                        {activity.timestamps?.start && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/40 mt-1">
                            <FaClock className="w-3 h-3" />
                            <span>{elapsedTime} elapsed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Add Friend Button */}
        <div className="pt-2">
          <a
            href={`https://discord.com/users/${discord_user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-lg text-white font-medium shadow-sm"
          >
            <FaDiscord className="w-5 h-5" />
            Add Friend
          </a>
        </div>
      </div>
    </motion.div>
  );
}