import { processEmail as processGmailEmail } from './emailService';
import { processEmail as processOutlookEmail } from './outlookEmail';
import { CronJob } from 'cron';

async function processAllEmails() {
  console.log('Starting automated email processing...');
  
  try {
    await processGmailEmail();
    console.log('Gmail processing completed');
    await processOutlookEmail();
    console.log('Outlook processing completed');
  } catch (error) {
    console.error('Error in automated email processing:', error);
  }
}

export function startAutomatedProcessing() {
  const job = new CronJob('*/5 * * * *', processAllEmails);
  job.start();
  console.log('Automated email processing scheduled. Will run every 5 minutes.');
}