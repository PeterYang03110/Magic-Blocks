import Chat from 'containers/Chat';
import { ChatProvider } from 'contexts/chat-context';

export default function ChatPage() {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
}
