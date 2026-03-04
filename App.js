import React, { useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SESSIONS = [
  {
    id: '1',
    title: 'Утренний фокус',
    duration: '10 мин',
    premium: false,
    emoji: '🌅',
  },
  {
    id: '2',
    title: 'Антистресс перед сном',
    duration: '15 мин',
    premium: true,
    emoji: '🌙',
  },
  {
    id: '3',
    title: 'Глубокое расслабление',
    duration: '20 мин',
    premium: true,
    emoji: '💧',
  },
  {
    id: '4',
    title: 'Быстрая перезагрузка',
    duration: '5 мин',
    premium: false,
    emoji: '⚡️',
  },
  {
    id: '5',
    title: 'Мягкое пробуждение',
    duration: '8 мин',
    premium: false,
    emoji: '🌸',
  },
  {
    id: '6',
    title: 'Гармония в течение дня',
    duration: '12 мин',
    premium: true,
    emoji: '🕊️',
  },
  {
    id: '7',
    title: 'Глубокий сон',
    duration: '25 мин',
    premium: true,
    emoji: '💤',
  },
];

function MeditationsScreen({ isSubscribed, onOpenPaywall }) {
  const data = useMemo(() => SESSIONS, []);

  const renderItem = ({ item }) => {
    const locked = item.premium && !isSubscribed;

    return (
      <Pressable
        onPress={locked ? onOpenPaywall : () => {}}
        style={[
          styles.card,
          locked && styles.cardLocked,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <View style={styles.cardImage}>
              <Text style={styles.cardImageEmoji}>{item.emoji}</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          {locked ? (
            <View style={styles.lockRow}>
              <Ionicons name="lock-closed" size={16} color="#9ca3af" />
              <Text style={styles.lockText}>Только для подписки</Text>
            </View>
          ) : (
            <Text style={styles.cardSubtitle}>Доступно сейчас</Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Медитации</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function PaywallScreen({ isSubscribed, onPurchase }) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>ZenPulse Premium</Text>
      <Text style={styles.paywallSubtitle}>
        Глубокая перезагрузка для ума и тела
      </Text>

      <View style={styles.benefitsBox}>
        <Text style={styles.benefitItem}>• Полный доступ ко всем медитациям</Text>
        <Text style={styles.benefitItem}>• AI «настрой дня» без ограничений</Text>
        <Text style={styles.benefitItem}>• Эксклюзивные сессии и плейлисты</Text>
      </View>

      <View style={styles.plansRow}>
        <View style={styles.planCard}>
          <Text style={styles.planLabel}>Месяц</Text>
          <Text style={styles.planPrice}>$4.99</Text>
          <Text style={styles.planNote}>Гибкая подписка</Text>
        </View>
        <View style={[styles.planCard, styles.planCardHighlighted]}>
          <Text style={styles.planBadge}>Выгодно</Text>
          <Text style={styles.planLabel}>Год</Text>
          <Text style={styles.planPrice}>$29.99</Text>
          <Text style={styles.planNote}>Экономия до 50%</Text>
        </View>
      </View>

      <Pressable style={styles.ctaButton} onPress={onPurchase}>
        <Text style={styles.ctaText}>
          {isSubscribed ? 'Подписка активна' : 'Попробовать бесплатно'}
        </Text>
      </Pressable>
      <Text style={styles.trialNote}>
        Нажатие имитирует успешную покупку и открывает доступ к контенту.
      </Text>
    </View>
  );
}

const MOODS = [
  { id: 'calm', label: 'Спокойный', emoji: '🙂' },
  { id: 'stressed', label: 'Напряжённый', emoji: '😣' },
  { id: 'tired', label: 'Усталый', emoji: '🥱' },
];

function generateAffirmation(moodId) {
  const base = {
    calm: [
      'Сегодня твой ум ясен, а дыхание ровное. Позволь себе идти в своём темпе.',
      'Ты уже в состоянии внутреннего покоя. Всё, что нужно, — мягко сохранить это чувство.',
    ],
    stressed: [
      'Сделай один глубокий вдох. С каждым выдохом отпускай напряжение и мысли, которые не служат тебе.',
      'Сейчас не нужно решать всё сразу. Дай себе 3 минуты тишины — мир подождёт.',
    ],
    tired: [
      'Твоё тело устало, и это нормально. Позволь себе замедлиться и напитай себя мягким вниманием.',
      'Сегодня можно быть неидеальным. Главное — бережно отнестись к себе и дать себе отдых.',
    ],
  };

  const list = base[moodId] ?? base.calm;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function AiVibeScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [text, setText] = useState('');

  const handleMoodPress = (mood) => {
    setSelectedMood(mood.id);
    const next = generateAffirmation(mood.id);
    setText(next);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>AI настрой дня</Text>
      <Text style={styles.textCenter}>
        Выбери своё текущее состояние, а мы сгенерируем короткую аффирмацию.
      </Text>

      <View style={styles.moodsRow}>
        {MOODS.map((mood) => {
          const active = selectedMood === mood.id;
          return (
            <Pressable
              key={mood.id}
              onPress={() => handleMoodPress(mood)}
              style={[
                styles.moodButton,
                active && styles.moodButtonActive,
              ]}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.affirmationBox}>
        <Text style={styles.affirmationTitle}>Твой настрой</Text>
        <Text style={styles.affirmationText}>
          {text || 'Нажми на смайлик, чтобы получить персональное сообщение.'}
        </Text>
      </View>
    </View>
  );
}

function BottomTabBar({ currentTab, setTab }) {
  return (
    <View style={styles.tabBar}>
      <TabItem
        label="Медитации"
        icon="moon"
        isActive={currentTab === 'meditations'}
        onPress={() => setTab('meditations')}
      />
      <TabItem
        label="Подписка"
        icon="card"
        isActive={currentTab === 'paywall'}
        onPress={() => setTab('paywall')}
      />
      <TabItem
        label="AI настрой"
        icon="star"
        isActive={currentTab === 'ai'}
        onPress={() => setTab('ai')}
      />
    </View>
  );
}

function TabItem({ label, icon, isActive, onPress }) {
  const color = isActive ? '#fed7e2' : 'rgba(248, 250, 252, 0.7)';
  const backgroundColor = isActive
    ? 'rgba(251, 113, 133, 0.32)'
    : 'rgba(15, 23, 42, 0.35)';

  return (
    <Pressable onPress={onPress} style={[styles.tabItem, { backgroundColor }]}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('meditations'); // медитации по умолчанию
  const [isSubscribed, setIsSubscribed] = useState(false);

  let content = null;

  if (currentTab === 'meditations') {
    content = (
      <MeditationsScreen
        isSubscribed={isSubscribed}
        onOpenPaywall={() => setCurrentTab('paywall')}
      />
    );
  } else if (currentTab === 'paywall') {
    content = (
      <PaywallScreen
        isSubscribed={isSubscribed}
        onPurchase={() => setIsSubscribed(true)}
      />
    );
  } else {
    content = <AiVibeScreen />;
  }

  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={require('./assets/meditation-bg.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />
      <View style={styles.appContent}>{content}</View>
      <BottomTabBar currentTab={currentTab} setTab={setCurrentTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  appContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 40,
  },
  screenContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 191, 150, 0.20)', // персиковый полупрозрачный
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  cardLocked: {
    opacity: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)', // похожий на фон месяца
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '600',
  },
  cardDuration: {
    color: '#fee2e2',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSubtitle: {
    color: '#7f1d1d',
    fontSize: 14,
  },
  lockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lockText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  paywallSubtitle: {
    color: '#fee2ff',
    fontSize: 16,
    marginBottom: 16,
  },
  benefitsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  benefitItem: {
    color: '#e5e7eb',
    fontSize: 14,
    marginBottom: 6,
  },
  plansRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  planCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#4b5563',
    marginRight: 8,
  },
  planCardHighlighted: {
    borderColor: '#f9a8d4',
    backgroundColor: 'rgba(251, 113, 133, 0.32)',
  },
  planBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fb7185',
    color: '#f9fafb',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    marginBottom: 4,
  },
  planLabel: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  planNote: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: 'rgba(251, 113, 133, 0.92)',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  ctaText: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  trialNote: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
  },
  textCenter: {
    color: '#fef9c3',
    fontSize: 14,
    marginBottom: 20,
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  moodButtonActive: {
    borderColor: '#f9a8d4',
    backgroundColor: 'rgba(251, 113, 133, 0.25)',
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    color: '#e5e7eb',
    fontSize: 12,
  },
  affirmationBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  affirmationTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  affirmationText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.35)', // полупрозрачное окошко
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 11,
  },
})