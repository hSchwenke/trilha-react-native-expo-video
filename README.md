# 📱 Aplicativo de Gravação e Compartilhamento de Vídeos (React Native + Expo)

> Fork do projeto desenvolvido na trilha de React Native da [Digital Innovation One (DIO)](https://github.com/digitalinnovationone/trilha-react-native-expo-video).

Aplicativo móvel intuitivo desenvolvido com React Native, Expo e TypeScript, permitindo aos usuários gravar vídeos em alta resolução com áudio, visualizar imediatamente a gravação, salvar diretamente nos álbuns/galeria do dispositivo e compartilhar em um toque através das redes e aplicativos instalados.

---

## ✨ Funcionalidades

- **Câmera Intuitiva**:
  - Gravação de vídeo com áudio em alta definição (1080p).
  - Botão de gravação estilo câmera nativa (com transição visual de gravação).
  - Cronômetro e badge de gravação (`REC 00:00`) em tempo real.
  - Alternância entre câmera frontal e traseira (Flip Camera).
  - Controle de iluminação / lanterna (Flash/Torch).
- **Player de Vídeo de Alta Performance**:
  - Reprodução contínua (loop) com o novo e veloz `expo-video`.
  - Pré-visualização com barras flutuantes e interface escura moderna.
- **Salvar na Galeria (`expo-media-library`)**:
  - Salvamento direto no rolo da câmera / galeria de fotos através da API nativa `Asset.create`.
- **Compartilhamento Rápido (`expo-sharing`)**:
  - Compartilhe o vídeo gravado com 1 toque (WhatsApp, Telegram, Instagram, Google Drive, etc.).
- **Gerenciamento Inteligente de Permissões**:
  - Hooks nativos (`useCameraPermissions`, `useMicrophonePermissions`, `usePermissions`).
  - Tela explicativa e botão de re-solicitação caso o usuário recuse alguma permissão.

---

## 📦 Pacotes Expo Utilizados (Expo SDK 58)

| Pacote | Versão | Função | Documentação |
|---|---|---|---|
| `expo` | `~58.0.26` | Framework React Native Expo | [Docs](https://docs.expo.dev/) |
| `expo-camera` | `~58.0.14` | Captura de vídeo, fotos e controle de câmera/flash/áudio | [Docs](https://docs.expo.dev/versions/latest/sdk/camera/) |
| `expo-video` | `~58.0.14` | Player moderno de alta performance para reprodução de vídeo | [Docs](https://docs.expo.dev/versions/latest/sdk/video/) |
| `expo-media-library` | `~58.0.14` | Acesso e salvamento na galeria de mídia do dispositivo | [Docs](https://docs.expo.dev/versions/latest/sdk/media-library/) |
| `expo-sharing` | `~58.0.23` | Compartilhamento nativo de arquivos entre aplicativos | [Docs](https://docs.expo.dev/versions/latest/sdk/sharing/) |
| `@expo/vector-icons` | `^15.1.1` | Biblioteca de ícones (Ionicons, Material, etc.) | [Docs](https://icons.expo.fyi/) |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior recomendado)
- Git
- Aplicativo **Expo Go** instalado no seu dispositivo físico (Android ou iOS) ou um emulador configurado.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/hSchwenke/trilha-react-native-expo-video.git
   cd trilha-react-native-expo-video
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento do Expo:**
   ```bash
   npx expo start
   ```

4. **Abra no dispositivo ou navegador:**
   - **Web:** Execute `npm run web` (ou `npx expo start --web`) para abrir diretamente no seu navegador.
   - **Android:** Leia o QR Code exibido no terminal pelo app Expo Go (ou pressione `a` para emulador).
   - **iOS:** Leia o QR Code usando o aplicativo Câmera nativo (ou pressione `i` para simulador).

---

## 📂 Estrutura de Arquivos

```
├── App.tsx                     # Componente raiz: fluxo de permissões, controle de estados e timers
├── app.json                    # Metadados Expo e permissões nativas para iOS e Android
├── src/
│   └── components/
│       ├── CameraView/         # Interface e controles da câmera (botão shutter, timer, flip, flash)
│       │   ├── index.tsx
│       │   ├── props.ts
│       │   └── styles.ts
│       └── VideoPlayer/        # Interface de reprodução, salvar na galeria e compartilhar
│           ├── index.tsx
│           ├── props.ts
│           └── styles.ts
├── assets/                     # Ícones e splash screen
└── package.json
```

---

## 🎓 Metodologia & Versionamento Git

Este repositório faz parte dos exercícios práticos da DIO, reforçando boas práticas de Git, commits atômicos e documentação contínua.
