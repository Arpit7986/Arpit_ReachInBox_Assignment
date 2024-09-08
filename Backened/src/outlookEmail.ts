import { getOutlookClient } from './outlookAuthentication';
import { categorizeEmail, generateResponse } from './chatgpt';
import { GraphError } from '@microsoft/microsoft-graph-client';
import { log } from 'console';


export const getLatestEmail = async () => {
  const client = getOutlookClient();
  
  
  try {
    const messages = await client.api('/users/me/messages')
      .filter('isRead eq false')
      .top(1)
      .get();

      console.log(messages);
      console.log("Arpit Jain Above Message");
      
      
    if (!messages.value || messages.value.length === 0) {
      throw new Error('No unread messages found');
    }

    return messages.value[0];
  } catch (error) {
    console.error('Error fetching latest email:', error);
    if (error instanceof GraphError) {
      console.error('GraphError details:', {
        statusCode: error.statusCode,
        code: error.code,
        message: error.message,
        requestId: error.requestId,
      });
    }
    throw error;
  }
};

export const sendEmail = async (to: string, subject: string, body: string) => {
  const client = getOutlookClient();
  const message = {
    subject: subject,
    body: {
      contentType: 'Text',
      content: body
    },
    toRecipients: [
      {
        emailAddress: {
          address: to
        }
      }
    ]
  };

  await client.api('/users/me/sendMail').post({ message });
};

export const applyLabelToEmail = async (emailId: string, labelName: string) => {
  const client = getOutlookClient();
  try {
    await client.api(`/users/me/messages/${emailId}`)
      .update({ categories: [labelName] });
    console.log(`Applied category ${labelName} to email ${emailId}`);
  } catch (error) {
    console.error('Error applying category:', error);
  }
};

export const processEmail = async () => {
  try {
    const email = await getLatestEmail();
    const subject = email.subject || 'No Subject';
    const content = email.bodyPreview || '';
    const sender = email.from?.emailAddress?.address || '';

    console.log(`Processing email from ${sender} with subject: "${subject}"`);

    const category = await categorizeEmail(subject, content);
    const response = await generateResponse(category, subject, content);

    await sendEmail(sender, `Re: ${subject}`, response);
    await applyLabelToEmail(email.id, category);

    console.log(`Email processed successfully. Category: ${category}, Response sent to: ${sender}`);
    return `Email processed. Category: ${category}, Response sent to: ${sender}`;
  } catch (error) {
    console.error('Error processing email:', error);

    if (error instanceof GraphError) {
      console.error('GraphError details:', {
        statusCode: error.statusCode,
        code: error.code,
        message: error.message,
        requestId: error.requestId,
      });
    }

    return 'Error processing email';
  }
};
