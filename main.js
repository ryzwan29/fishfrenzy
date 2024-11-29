import { loadTokensFromFile, loadProxiesFromFile } from './utils/file.js';
import { getNextProxy } from './utils/proxy.js';
import { getUserInfo, verifyQuest, getSocialQuests, claimDailyReward, buyFishing, useItem, completeTutorial } from './utils/api.js';
import { banner } from './utils/banner.js';
import { logger } from './utils/logger.js';
import { fishing } from './utils/game.js';
import readline from 'readline';
import fetch from 'node-fetch';

const askQuestion = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    }));
};

async function getPublicIP() {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.ip;
}

async function main() {
  logger(banner, 'debug')
  const tokens = loadTokensFromFile('tokens.txt');
  const proxies = loadProxiesFromFile('proxy.txt');
  let type = await askQuestion('Choose Your fishing type\n1. short_range  \n2. mid_range \n3. long_range \nEnter your choice (1 2 3): ');

  if (proxies.length === 0) {
    logger('No proxies found. Exiting...', 'error');
    return;
  }

  let proxyIndex = 0;

    while (true) {
        let counter = 1
        for (const token of tokens) {
        const { proxy, nextIndex } = getNextProxy(proxies, proxyIndex);
        proxyIndex = nextIndex;

        const publicIP = await getPublicIP();
        logger(`Using proxy IP: ${publicIP}`);
        const profile = await getUserInfo(token, proxy);
        
        if (!profile) {
          logger(`Failed to fetch profile for Account #${counter}: `, 'error');
          counter++;
          continue;
        }
        const isCompleteTutorial = profile.isCompleteTutorial
        const isClaimedDailyReward = profile.isClaimedDailyReward
        const userId = profile.id;
        logger(`Account #${counter} | EXP Points: ${profile.fishPoint} | Gold: ${profile.gold} | Energy: ${profile.energy}`, 'debug');
        if (!isCompleteTutorial) {
          await completeTutorial(token, proxy, userId)
          const quests = await getSocialQuests(token, proxy);
          const ids = quests.map(item => item.id);
          for (const id of ids) { 
            logger(`Account #${counter} | Claim Quests ID:`, 'info', id)
            await verifyQuest(token, id, proxy);
          }
        } else if (!isClaimedDailyReward) { 
          await claimDailyReward(token, proxy)
        } else if (profile.gold > 1500) {
          const buy = await buyFishing(token, proxy, userId)
          if (buy) {
            logger(`Account #${counter} | Buy and Use Exp Schroll for user ${userId}`)
            await useItem(token, proxy, userId)
          }
        }

          if (type === '1' && profile.energy > 0) {
            await fishing(token, type, proxy);
          } else if (type === '2' && profile.energy > 1) {
            await fishing(token, type, proxy);
          } else if (type === '3' && profile.energy > 2) { 
            await fishing(token, type, proxy);
          } else {
            logger(`Account #${counter} | Not Enough Energy to start fishing...`, 'warn');
            logger('Waiting 5 hours before trying again...');
            await new Promise(resolve => setTimeout(resolve, 18000000));
          }
          counter++;
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

    logger('Waiting 1 minute before Fishing again...');
    await new Promise(resolve => setTimeout(resolve, 60000)); 
  }
}

main().catch(error => {
  logger('Error in main loop:', 'error');
});
