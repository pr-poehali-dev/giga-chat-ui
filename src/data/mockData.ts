export type MessageType = 'text' | 'voice';

export interface Message {
  id: string;
  from: 'me' | 'them';
  type: MessageType;
  text?: string;
  duration?: number;
  time: string;
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Анастасия Громова',
    avatar: 'АГ',
    lastMessage: 'Окей, жду твой ответ!',
    lastTime: '14:32',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', from: 'them', type: 'text', text: 'Привет! Как дела?', time: '14:10', read: true },
      { id: 'm2', from: 'me', type: 'text', text: 'Всё отлично, спасибо! Работаю над новым проектом.', time: '14:12', read: true },
      { id: 'm3', from: 'them', type: 'text', text: 'Здорово! Расскажи подробнее, это интересно 🙂', time: '14:15', read: true },
      { id: 'm4', from: 'me', type: 'voice', duration: 18, time: '14:20', read: true },
      { id: 'm5', from: 'them', type: 'text', text: 'Круто! Когда планируешь завершить?', time: '14:28', read: true },
      { id: 'm6', from: 'them', type: 'text', text: 'Окей, жду твой ответ!', time: '14:32', read: false },
    ],
  },
  {
    id: '2',
    name: 'Максим Орлов',
    avatar: 'МО',
    lastMessage: 'Голосовое сообщение · 0:24',
    lastTime: '12:58',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', from: 'me', type: 'text', text: 'Макс, ты видел новый релиз?', time: '12:40', read: true },
      { id: 'm2', from: 'them', type: 'text', text: 'Да, только что смотрел. Огонь!', time: '12:45', read: true },
      { id: 'm3', from: 'them', type: 'voice', duration: 24, time: '12:58', read: true },
    ],
  },
  {
    id: '3',
    name: 'Команда дизайна',
    avatar: '🎨',
    lastMessage: 'Виктория: Правки отправила',
    lastTime: '11:20',
    unread: 5,
    online: true,
    messages: [
      { id: 'm1', from: 'them', type: 'text', text: 'Всем привет! Обновила макеты.', time: '10:55', read: true },
      { id: 'm2', from: 'me', type: 'text', text: 'Принял, смотрю сейчас.', time: '11:00', read: true },
      { id: 'm3', from: 'them', type: 'text', text: 'Правки отправила', time: '11:20', read: false },
    ],
  },
  {
    id: '4',
    name: 'Дмитрий Карпов',
    avatar: 'ДК',
    lastMessage: 'Ок, договорились!',
    lastTime: 'Вчера',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', from: 'them', type: 'text', text: 'Встреча в пятницу в 15:00?', time: '18:00', read: true },
      { id: 'm2', from: 'me', type: 'text', text: 'Да, подходит.', time: '18:05', read: true },
      { id: 'm3', from: 'them', type: 'text', text: 'Ок, договорились!', time: '18:07', read: true },
    ],
  },
  {
    id: '5',
    name: 'Елена Соколова',
    avatar: 'ЕС',
    lastMessage: 'Спасибо за помощь 🙏',
    lastTime: 'Вчера',
    unread: 0,
    online: true,
    messages: [
      { id: 'm1', from: 'me', type: 'voice', duration: 45, time: '16:30', read: true },
      { id: 'm2', from: 'them', type: 'text', text: 'Спасибо за помощь 🙏', time: '16:45', read: true },
    ],
  },
  {
    id: '6',
    name: 'Андрей Новиков',
    avatar: 'АН',
    lastMessage: 'Пришли документы',
    lastTime: 'Пн',
    unread: 1,
    online: false,
    messages: [
      { id: 'm1', from: 'them', type: 'text', text: 'Привет, пришли документы по проекту', time: '09:00', read: false },
    ],
  },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Анастасия Громова', avatar: 'АГ', status: 'На связи', online: true },
  { id: '2', name: 'Андрей Новиков', avatar: 'АН', status: 'Был(а) вчера', online: false },
  { id: '3', name: 'Виктория Лебедева', avatar: 'ВЛ', status: 'Дизайнер', online: true },
  { id: '4', name: 'Дмитрий Карпов', avatar: 'ДК', status: 'В дороге', online: false },
  { id: '5', name: 'Елена Соколова', avatar: 'ЕС', status: 'Работаю', online: true },
  { id: '6', name: 'Максим Орлов', avatar: 'МО', status: 'Был(а) 2ч назад', online: false },
  { id: '7', name: 'Наталья Борисова', avatar: 'НБ', status: 'Занята', online: true },
  { id: '8', name: 'Сергей Иванов', avatar: 'СИ', status: 'На связи', online: true },
];
