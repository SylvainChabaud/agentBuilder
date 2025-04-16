import { MODEL_SOURCES } from '../constants';

export const MODELS = [
  ///////////////////
  // OLLAMA MODELS //
  ///////////////////
  {
    id: 'qwen 7b',
    model: 'qwen2.5:7b',
    name: 'Qwen 2.5 7B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'qwen 1.5b',
    model: 'qwen2.5:1.5b',
    name: 'Qwen 2.5 1.5B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'qwen 3b',
    model: 'qwen2.5:3b',
    name: 'Qwen 2.5 3B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'deepseek 7b',
    model: 'deepseek-r1:7b',
    name: 'DeepSeek R1 7B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'deepseek 1.5b',
    model: 'deepseek-r1:1.5b',
    name: 'DeepSeek R1 1.5B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'mistral 7b',
    model: 'mistral:7b',
    name: 'Mistra l 7B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  {
    id: 'llama 3b',
    model: 'llama3.2:3b',
    name: 'Llama 3.2 3B (gratuit)',
    modelSource: MODEL_SOURCES.OLLAMA,
  },
  ////////////////////////
  // OPEN_ROUTER MODELS //
  ////////////////////////
  {
    id: 'llama 70b',
    model: 'nvidia/llama-3.1-nemotron-70b-instruct:free',
    name: 'Llama 3.1 70B (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'deepseek llama 70b',
    model: 'deepseek/deepseek-r1-distill-llama-70b:free',
    name: 'deepseek llama 70B (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'deepseek R1 70b',
    model: 'deepseek/deepseek-r1:free',
    name: 'deepseek R1 70B (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'deepseek chat 70b',
    model: 'deepseek/deepseek-chat:free',
    name: 'deepseek chat 70B (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  // {
  //   id: 'qwen coder 32b',
  //   model: 'qwen/qwen-2.5-coder-32b-instruct:free',
  //   name: 'qwen coder 32b',
  //   modelSource: MODEL_SOURCES.OPEN_ROUTER,
  // },
  {
    id: 'mistral instruct 7b',
    model: 'mistralai/mistral-7b-instruct:free',
    name: 'mistral instruct 7b (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'qwen instruct 72b',
    model: 'qwen/qwen2.5-vl-72b-instruct:free',
    name: 'qwen 2.5 72b (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'qwen qwq 32b',
    model: 'qwen/qwq-32b:free',
    name: 'qwen qwq 32b (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'mistral 24b',
    model: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
    name: 'mistral 3.0 24b (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  {
    id: 'mistral R1 24b',
    model: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
    name: 'mistral R1 24b (gratuit limité)',
    modelSource: MODEL_SOURCES.OPEN_ROUTER,
  },
  ////////////////////
  // OPEN IA MODELS //
  ////////////////////
  {
    id: 'deepseek V3',
    model: 'deepseek-chat',
    name: 'deepseek V3 (payant)',
    modelSource: MODEL_SOURCES.OPEN_IA,
  },
];
