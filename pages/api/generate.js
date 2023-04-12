import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '',
});

const openai = new OpenAIApi(configuration);
// you are a copywriter, you are the best one in the world you have to review the text written below and rewrite it to make it more witty and conversational
const basePromptPrefix =
  // 'Help me write lyrics in the style of Drake, Canadian Rapper\n'
  'You are a copywriter, you are the best one in the world you have to review the text written below and rewrite it to make it more witty and conversational\n';
const finalPromptPrefix = 'Take the lyrics below and generate 5 song titles:\n';

const generateAction = async (req, res) => {

  let baseCompletion;
  try {
    // Run first prompt
  baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.input}`,
    temperature: 0.7,
    max_tokens: 2048,
  });
  } catch (e) {
    console.log(e);
  }
  

  const baseChoice = baseCompletion.data.choices.pop();

  // Run second prompt with prefix
  const finalPrompt = `${finalPromptPrefix}${req.body.input}${baseChoice.text}`;

  const prefixCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: finalPrompt,
    temperature: 0.7,
    max_tokens: 2048,
  });

  const finalChoice = prefixCompletion.data.choices.pop();

  res.status(200).json({ baseChoice, finalChoice });
};

export default generateAction;
