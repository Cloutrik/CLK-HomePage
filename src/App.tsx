import {
  Activity,
  Award,
  BellRing,
  Boxes,
  ChevronRight,
  Code2,
  Gamepad2,
  GitBranch,
  Github,
  Medal,
  MessageSquareText,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UsersRound,
  Workflow,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native-web";

const heroImage =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=85";

const githubUrl = "https://github.com/Cloutrik";

const tracks = [
  {
    title: "Truques de Git",
    text: "Branches, PRs, revisao de codigo, conventional commits e protecao de main.",
    icon: GitBranch
  },
  {
    title: "Truques de entrega",
    text: "Pipelines validando testes, build, qualidade e publicacao automatica.",
    icon: Workflow
  },
  {
    title: "Truques de observabilidade",
    text: "Logs, metricas, traces, alertas e incidentes simulados para aprender operando.",
    icon: Activity
  },
  {
    title: "Truques de nuvem",
    text: "Microservicos, mensageria, contratos, resiliencia e comunicacao entre servicos.",
    icon: Boxes
  }
];

const missions = [
  "Primeiro PR aprovado",
  "Pipeline verde",
  "Servico com healthcheck",
  "Evento publicado na fila",
  "Dashboard de metricas",
  "Incidente resolvido"
];

const ranking = [
  { name: "Builder", points: "1.240 XP", badge: "Nivel 8" },
  { name: "Observer", points: "980 XP", badge: "Nivel 6" },
  { name: "Messenger", points: "760 XP", badge: "Nivel 5" }
];

const xpBursts = ["+80 XP", "+1 streak", "+badge", "+120 XP", "+rank"];

const evolutionBars = [
  { label: "W1", value: 42 },
  { label: "W2", value: 58 },
  { label: "W3", value: 73 },
  { label: "W4", value: 88 },
  { label: "W5", value: 96 }
];

const evolutionMilestones = ["PR", "CI", "Logs", "Fila", "Deploy"];

function useLoopedAnimation(duration: number, delay = 0) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(value, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [delay, duration, value]);

  return value;
}

function FloatingSignal({ index }: { index: number }) {
  const motion = useLoopedAnimation(2600 + index * 280, index * 180);
  const translateY = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, index % 2 === 0 ? -28 : 24]
  });
  const scale = motion.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.86, 1.12, 0.86]
  });
  const rotate = motion.interpolate({
    inputRange: [0, 1],
    outputRange: index % 2 === 0 ? ["-5deg", "8deg"] : ["7deg", "-6deg"]
  });
  const opacity = motion.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.28, 0.86, 0.28]
  });

  return (
    <Animated.View
      style={[
        styles.signal,
        signalPositions[index],
        {
          opacity,
          transform: [{ translateY }, { scale }, { rotate }]
        }
      ]}
    >
      <View style={styles.signalCore} />
    </Animated.View>
  );
}

function XpBurst({ index, label }: { index: number; label: string }) {
  const motion = useLoopedAnimation(2100 + index * 240, index * 210);
  const translateY = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [24, -18]
  });
  const opacity = motion.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 1, 0]
  });

  return (
    <Animated.View
      style={[
        styles.xpBurst,
        xpPositions[index],
        {
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <Sparkles size={13} color="#ffffff" />
      <Text style={styles.xpText}>{label}</Text>
    </Animated.View>
  );
}

function HeroTerminal() {
  const pulse = useLoopedAnimation(1900);
  const translateX = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [-12, 12]
  });
  const glow = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.78, 1]
  });

  return (
    <View style={styles.terminal}>
      <View style={styles.terminalHeader}>
        <View style={[styles.dot, styles.dotRed]} />
        <View style={[styles.dot, styles.dotYellow]} />
        <View style={[styles.dot, styles.dotCyan]} />
        <Text style={styles.terminalTitle}>CLOUTRIK quality board</Text>
      </View>
      <View style={styles.terminalBody}>
        <Text style={styles.terminalLine}>evidencias geradas pelo GitHub Actions</Text>
        <Text style={styles.terminalLine}>qualidade antes de ranking, sempre</Text>
        <Animated.View style={[styles.pipeline, { transform: [{ translateX }] }]}>
          <ScanLine size={18} color="#180d2e" />
          <Text style={styles.pipelineText}>score de qualidade: 94/100</Text>
        </Animated.View>
        <View style={styles.levelWrap}>
          <View style={styles.levelTopline}>
            <Text style={styles.levelLabel}>certificacao backend iniciante</Text>
            <Text style={styles.levelValue}>82%</Text>
          </View>
          <View style={styles.levelTrack}>
            <Animated.View style={[styles.levelFill, { opacity: glow }]} />
          </View>
        </View>
        <View style={styles.statusGrid}>
          {["testes", "coverage", "seguranca", "logs", "metricas", "review"].map((item) => (
            <View key={item} style={styles.statusPill}>
              <ShieldCheck size={15} color="#8b5cf6" />
              <Text style={styles.statusText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.evidenceList}>
          <Text style={styles.evidenceItem}>PR aprovado por checklist tecnico</Text>
          <Text style={styles.evidenceItem}>servico publicado com healthcheck</Text>
          <Text style={styles.evidenceItem}>dashboard e alerta anexados ao desafio</Text>
        </View>
      </View>
    </View>
  );
}

function EvolutionBar({ bar, index }: { bar: { label: string; value: number }; index: number }) {
  const motion = useLoopedAnimation(1600 + index * 180, index * 120);
  const glow = useLoopedAnimation(1800);
  const barScale = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1]
  });
  const opacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1]
  });

  return (
    <View style={styles.chartColumn}>
      <View style={styles.chartTrack}>
        <Animated.View
          style={[
            styles.chartBar,
            {
              height: `${bar.value}%`,
              opacity,
              transform: [{ scaleY: barScale }]
            }
          ]}
        />
      </View>
      <Text style={styles.chartLabel}>{bar.label}</Text>
    </View>
  );
}

function RankEvolution() {
  const pulse = useLoopedAnimation(1800);
  const drift = useLoopedAnimation(2600);
  const glow = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1]
  });
  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.04]
  });
  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  return (
    <View style={styles.evolutionBand}>
      <View style={styles.evolutionPanel}>
        <View style={styles.evolutionCopy}>
          <Text style={styles.evolutionKicker}>rank evolui com prova</Text>
          <Text style={styles.evolutionTitle}>Do primeiro PR ao topo do ranking</Text>
          <Text style={styles.evolutionText}>
            A CLOUTRIK transforma cada truque de nuvem em progresso visivel: passou nos
            gates, gerou evidencia, ganhou XP e subiu de nivel.
          </Text>
          <View style={styles.evolutionBadges}>
            <View style={styles.evolutionBadge}>
              <ShieldCheck size={16} color="#7dd3fc" />
              <Text style={styles.evolutionBadgeText}>qualidade validada</Text>
            </View>
            <View style={styles.evolutionBadge}>
              <Trophy size={16} color="#f4d35e" />
              <Text style={styles.evolutionBadgeText}>ranking vivo</Text>
            </View>
          </View>
        </View>

        <View style={styles.evolutionBoard}>
          <View style={styles.evolutionBoardHeader}>
            <View>
              <Text style={styles.evolutionBoardTitle}>Evolucao de XP</Text>
              <Text style={styles.evolutionBoardSub}>missao cloud foundations</Text>
            </View>
            <Animated.View
              style={[
                styles.rankUp,
                {
                  opacity: glow,
                  transform: [{ scale }]
                }
              ]}
            >
              <Star size={15} color="#ffffff" />
              <Text style={styles.rankUpText}>rank up</Text>
            </Animated.View>
          </View>

          <View style={styles.chart}>
            {evolutionBars.map((bar, index) => (
              <EvolutionBar key={bar.label} bar={bar} index={index} />
            ))}
          </View>

          <View style={styles.milestoneRail}>
            {evolutionMilestones.map((milestone, index) => (
              <View key={milestone} style={styles.milestone}>
                <Animated.View
                  style={[
                    styles.milestoneDot,
                    index === 4 && {
                      opacity: glow,
                      transform: [{ translateY }]
                    }
                  ]}
                />
                <Text style={styles.milestoneText}>{milestone}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function ScrollReactiveHud({ scrollY }: { scrollY: any }) {
  const rotate = scrollY.interpolate({
    inputRange: [0, 500, 1000, 1500],
    outputRange: ["0deg", "120deg", "240deg", "360deg"],
    extrapolate: "clamp"
  });
  const translateY = scrollY.interpolate({
    inputRange: [0, 1500],
    outputRange: [0, 150],
    extrapolate: "clamp"
  });
  const scale = scrollY.interpolate({
    inputRange: [0, 650, 1300],
    outputRange: [1, 0.82, 1.08],
    extrapolate: "clamp"
  });
  const progressScale = scrollY.interpolate({
    inputRange: [0, 1600],
    outputRange: [0.08, 1],
    extrapolate: "clamp"
  });
  const startOpacity = scrollY.interpolate({
    inputRange: [0, 360, 700],
    outputRange: [1, 0.35, 0.18],
    extrapolate: "clamp"
  });
  const xpOpacity = scrollY.interpolate({
    inputRange: [350, 850, 1250],
    outputRange: [0.22, 1, 0.35],
    extrapolate: "clamp"
  });
  const rankOpacity = scrollY.interpolate({
    inputRange: [900, 1350, 1700],
    outputRange: [0.18, 1, 0.65],
    extrapolate: "clamp"
  });

  return (
    <View pointerEvents="none" style={styles.scrollHud}>
      <View style={styles.scrollRail}>
        <Animated.View
          style={[
            styles.scrollFill,
            {
              transform: [{ scaleY: progressScale }]
            }
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.scrollOrb,
          {
            transform: [{ translateY }, { rotate }, { scale }]
          }
        ]}
      >
        <Zap size={16} color="#ffffff" />
      </Animated.View>
      <View style={styles.scrollHudLabels}>
        <Animated.Text style={[styles.scrollHudLabel, { opacity: startOpacity }]}>
          start
        </Animated.Text>
        <Animated.Text style={[styles.scrollHudLabel, { opacity: xpOpacity }]}>xp</Animated.Text>
        <Animated.Text style={[styles.scrollHudLabel, { opacity: rankOpacity }]}>
          rank
        </Animated.Text>
      </View>
    </View>
  );
}

function App() {
  const signals = useMemo(() => Array.from({ length: 8 }, (_, index) => index), []);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScroll =
          window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        scrollY.setValue(currentScroll);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [scrollY]);

  const handleScroll = (event: any) => {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const nativeY = event.nativeEvent?.contentOffset?.y;
    const elementY = currentTarget?.scrollTop;
    scrollY.setValue(nativeY ?? elementY ?? window.scrollY ?? 0);
  };

  const heroTranslate = scrollY.interpolate({
    inputRange: [0, 520],
    outputRange: [0, -54],
    extrapolate: "clamp"
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 420],
    outputRange: [1, 0.62],
    extrapolate: "clamp"
  });
  const heroScale = scrollY.interpolate({
    inputRange: [0, 520],
    outputRange: [1, 0.96],
    extrapolate: "clamp"
  });

  return (
    <Animated.ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.page}
      contentContainerStyle={styles.content}
    >
      <ScrollReactiveHud scrollY={scrollY} />
      <ImageBackground source={{ uri: heroImage }} resizeMode="cover" style={styles.hero}>
        <View style={styles.heroOverlay} />
        {signals.map((index) => (
          <FloatingSignal key={index} index={index} />
        ))}
        {xpBursts.map((label, index) => (
          <XpBurst key={label} index={index} label={label} />
        ))}

        <View style={styles.nav}>
          <View style={styles.brandMark}>
            <Code2 size={22} color="#f8fffb" />
          </View>
          <Text style={styles.brand}>CLOUTRIK</Text>
          <View style={styles.navActions}>
            <Pressable
              accessibilityRole="link"
              onPress={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
              style={styles.iconButton}
            >
              <Github size={19} color="#f8fffb" />
            </Pressable>
          </View>
        </View>

        <Animated.View
          style={[
            styles.heroGrid,
            {
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }, { scale: heroScale }]
            }
          ]}
        >
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>CLK: cloud tricks para aprender fazendo</Text>
            <Text style={styles.heroTitle}>CLOUTRIK</Text>
            <Text style={styles.heroText}>
              CLOUTRIK vem da ideia de truques de nuvem: desafios praticos que ensinam
              como trabalhar em projetos grandes com Git, CI/CD, observabilidade,
              mensageria, microservicos e qualidade comprovada por automacoes.
            </Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Gamepad2 size={18} color="#f4f0ff" />
                <Text style={styles.heroStatText}>quests semanais</Text>
              </View>
              <View style={styles.heroStat}>
                <Zap size={18} color="#7dd3fc" />
                <Text style={styles.heroStatText}>XP por contribuicao</Text>
              </View>
            </View>
            <View style={styles.heroActions}>
              <Pressable accessibilityRole="button" style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Participar do projeto</Text>
                <ChevronRight size={18} color="#16072e" />
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Ver trilhas</Text>
              </Pressable>
            </View>
          </View>

          <HeroTerminal />
        </Animated.View>
      </ImageBackground>

      <View style={styles.band}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Truques de nuvem com criterio de producao</Text>
          <Text style={styles.sectionText}>
            A ideia e criar uma experiencia guiada, colaborativa e gamificada para quem quer
            sair do tutorial e provar qualidade com evidencias reais.
          </Text>
        </View>

        <View style={styles.trackGrid}>
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
                <View key={track.title} style={styles.trackCard}>
                <View style={styles.trackIcon}>
                  <Icon size={24} color="#4c1d95" />
                </View>
                <Text style={styles.cardTitle}>{track.title}</Text>
                <Text style={styles.cardText}>{track.text}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <RankEvolution />

      <View style={styles.darkBand}>
        <View style={styles.gamePanel}>
          <View style={styles.gameCopy}>
            <Text style={styles.darkKicker}>certificacao + ranking</Text>
            <Text style={styles.darkTitle}>Contribua, ganhe XP e desbloqueie conquistas</Text>
            <Text style={styles.darkText}>
              Cada ponto precisa nascer de evidencia: PR revisado, pipeline aprovado,
              servico monitorado, evento publicado, alerta configurado e desafio concluido.
            </Text>
            <View style={styles.missionList}>
              {missions.map((mission) => (
                <View key={mission} style={styles.mission}>
                  <Award size={16} color="#c084fc" />
                  <Text style={styles.missionText}>{mission}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rankingBoard}>
            <View style={styles.rankingHeader}>
              <Trophy size={24} color="#f4d35e" />
              <Text style={styles.rankingTitle}>Ranking semanal</Text>
            </View>
            {ranking.map((player, index) => (
              <View key={player.name} style={styles.rankRow}>
                <View style={styles.rankPosition}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.rankInfo}>
                  <Text style={styles.rankName}>{player.name}</Text>
                  <Text style={styles.rankBadge}>{player.badge}</Text>
                </View>
                <Text style={styles.rankPoints}>{player.points}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.band}>
        <View style={styles.flow}>
          <View style={styles.flowItem}>
            <UsersRound size={25} color="#5b21b6" />
            <Text style={styles.flowTitle}>Todo mundo pode participar</Text>
            <Text style={styles.flowText}>
              Pessoas iniciantes e intermediarias entram por issues guiadas, revisoes e
              desafios graduais.
            </Text>
          </View>
          <View style={styles.flowItem}>
            <MessageSquareText size={25} color="#5b21b6" />
            <Text style={styles.flowTitle}>Mensageria como desafio</Text>
            <Text style={styles.flowText}>
              Servicos conversam por eventos, filas e contratos, com falhas simuladas para
              aprender de verdade.
            </Text>
          </View>
          <View style={styles.flowItem}>
            <BellRing size={25} color="#5b21b6" />
            <Text style={styles.flowTitle}>Operacao conta pontos</Text>
            <Text style={styles.flowText}>
              Alertas, dashboards e runbooks fazem parte da experiencia, nao ficam para
              depois.
            </Text>
          </View>
          <View style={styles.flowItem}>
            <Medal size={25} color="#5b21b6" />
            <Text style={styles.flowTitle}>Certificacao por evidencia</Text>
            <Text style={styles.flowText}>
              O progresso pode ser gerado por GitHub Actions em repositorios dedicados para
              certificados e ranking.
            </Text>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const signalPositions = [
  { top: "18%", left: "7%" },
  { top: "31%", left: "45%" },
  { top: "13%", right: "11%" },
  { top: "72%", left: "13%" },
  { top: "63%", right: "8%" },
  { top: "49%", left: "54%" },
  { top: "82%", right: "28%" },
  { top: "25%", left: "78%" }
];

const xpPositions = [
  { top: "24%", left: "24%" },
  { top: "44%", right: "23%" },
  { top: "58%", left: "6%" },
  { top: "78%", right: "17%" },
  { top: "18%", right: "36%" }
];

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f7f5ff"
  },
  content: {
    minHeight: "100%"
  },
  scrollHud: {
    position: "fixed",
    right: 18,
    top: "34%",
    width: 72,
    height: 250,
    zIndex: 30,
    alignItems: "center"
  },
  scrollRail: {
    position: "absolute",
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(124,58,237,0.18)"
  },
  scrollFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#c084fc"
  },
  scrollOrb: {
    position: "absolute",
    top: 0,
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7c3aed",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.58)",
    shadowColor: "#7c3aed",
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 }
  },
  scrollHudLabels: {
    position: "absolute",
    right: 50,
    top: 4,
    gap: 58,
    alignItems: "flex-end"
  },
  scrollHudLabel: {
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  hero: {
    minHeight: 720,
    paddingHorizontal: 28,
    paddingBottom: 48,
    overflow: "hidden"
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(12, 8, 28, 0.70)"
  },
  nav: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingTop: 24,
    paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(216,180,254,0.46)"
  },
  brand: {
    color: "#f8fffb",
    fontSize: 22,
    fontWeight: "800"
  },
  navActions: {
    marginLeft: "auto"
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(216,180,254,0.40)"
  },
  heroGrid: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 36
  },
  heroCopy: {
    flex: 1.05,
    minWidth: 300
  },
  kicker: {
    alignSelf: "flex-start",
    color: "#d8b4fe",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 16
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 88,
    lineHeight: 92,
    fontWeight: "900",
    letterSpacing: 0
  },
  heroText: {
    color: "#edf5ee",
    fontSize: 21,
    lineHeight: 32,
    maxWidth: 680,
    marginTop: 16
  },
  heroStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22
  },
  heroStat: {
    minHeight: 38,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(124,58,237,0.32)",
    borderWidth: 1,
    borderColor: "rgba(216,180,254,0.38)"
  },
  heroStatText: {
    color: "#f4f0ff",
    fontSize: 14,
    fontWeight: "800"
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 30
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#c084fc"
  },
  primaryButtonText: {
    color: "#16072e",
    fontWeight: "800",
    fontSize: 16
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.36)",
    backgroundColor: "rgba(255,255,255,0.08)"
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16
  },
  terminal: {
    flex: 0.82,
    minWidth: 320,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(17, 11, 32, 0.91)",
    borderWidth: 1,
    borderColor: "rgba(216,180,254,0.30)",
    shadowColor: "#000000",
    shadowOpacity: 0.34,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 22 }
  },
  terminalHeader: {
    minHeight: 46,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  dotRed: {
    backgroundColor: "#ff6b6b"
  },
  dotYellow: {
    backgroundColor: "#f4d35e"
  },
  dotCyan: {
    backgroundColor: "#7dd3fc"
  },
  terminalTitle: {
    color: "#d8c9ff",
    fontSize: 13,
    marginLeft: 8
  },
  terminalBody: {
    padding: 20,
    gap: 13
  },
  terminalLine: {
    color: "#d9d3ef",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    fontSize: 14
  },
  pipeline: {
    marginTop: 6,
    minHeight: 52,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#c084fc"
  },
  pipelineText: {
    color: "#180d2e",
    fontSize: 16,
    fontWeight: "900"
  },
  levelWrap: {
    gap: 8,
    marginTop: 4
  },
  levelTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  levelLabel: {
    color: "#f5f3ff",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  levelValue: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "900"
  },
  levelTrack: {
    height: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  levelFill: {
    width: "82%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#7dd3fc"
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8
  },
  statusPill: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.09)"
  },
  statusText: {
    color: "#f8fffb",
    fontSize: 13,
    fontWeight: "700"
  },
  evidenceList: {
    gap: 8,
    marginTop: 2
  },
  evidenceItem: {
    color: "#e8ddff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  signal: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,132,252,0.55)",
    backgroundColor: "rgba(124,58,237,0.16)",
    alignItems: "center",
    justifyContent: "center"
  },
  signalCore: {
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: "#7dd3fc"
  },
  xpBurst: {
    position: "absolute",
    minHeight: 34,
    borderRadius: 8,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(168,85,247,0.86)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.36)"
  },
  xpText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900"
  },
  band: {
    paddingHorizontal: 28,
    paddingVertical: 76
  },
  sectionHeader: {
    width: "100%",
    maxWidth: 820,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 34
  },
  sectionTitle: {
    color: "#1d1631",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900"
  },
  sectionText: {
    color: "#5f5872",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28,
    marginTop: 14
  },
  trackGrid: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  trackCard: {
    flexGrow: 1,
    flexBasis: 250,
    minHeight: 220,
    borderRadius: 8,
    padding: 22,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4dcff"
  },
  trackIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee7ff",
    marginBottom: 18
  },
  cardTitle: {
    color: "#1d1631",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
    marginBottom: 10
  },
  cardText: {
    color: "#625b70",
    fontSize: 16,
    lineHeight: 24
  },
  evolutionBand: {
    paddingHorizontal: 28,
    paddingVertical: 76,
    backgroundColor: "#f7f5ff"
  },
  evolutionPanel: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    borderRadius: 8,
    padding: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 26,
    backgroundColor: "#1a102f",
    borderWidth: 1,
    borderColor: "#d8b4fe"
  },
  evolutionCopy: {
    flex: 1,
    minWidth: 280,
    justifyContent: "center"
  },
  evolutionKicker: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 12
  },
  evolutionTitle: {
    color: "#ffffff",
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900"
  },
  evolutionText: {
    color: "#ddd6fe",
    fontSize: 17,
    lineHeight: 27,
    marginTop: 14
  },
  evolutionBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22
  },
  evolutionBadge: {
    minHeight: 38,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)"
  },
  evolutionBadgeText: {
    color: "#f5f3ff",
    fontSize: 14,
    fontWeight: "800"
  },
  evolutionBoard: {
    flex: 1,
    minWidth: 310,
    borderRadius: 8,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)"
  },
  evolutionBoardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14
  },
  evolutionBoardTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900"
  },
  evolutionBoardSub: {
    color: "#bca9df",
    fontSize: 13,
    marginTop: 4
  },
  rankUp: {
    minHeight: 34,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8b5cf6"
  },
  rankUpText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  chart: {
    height: 210,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    marginTop: 24
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    gap: 8
  },
  chartTrack: {
    width: "100%",
    height: 172,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,0.09)"
  },
  chartBar: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#c084fc"
  },
  chartLabel: {
    color: "#f5f3ff",
    fontSize: 12,
    fontWeight: "900"
  },
  milestoneRail: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  milestone: {
    alignItems: "center",
    gap: 7,
    flex: 1
  },
  milestoneDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#7dd3fc",
    borderWidth: 2,
    borderColor: "#ffffff"
  },
  milestoneText: {
    color: "#ddd6fe",
    fontSize: 12,
    fontWeight: "800"
  },
  darkBand: {
    paddingHorizontal: 28,
    paddingVertical: 76,
    backgroundColor: "#110b20"
  },
  gamePanel: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    flexDirection: "row",
    gap: 28,
    alignItems: "stretch"
  },
  gameCopy: {
    flex: 1.05
  },
  darkKicker: {
    color: "#d8b4fe",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 14
  },
  darkTitle: {
    color: "#ffffff",
    fontSize: 40,
    lineHeight: 47,
    fontWeight: "900"
  },
  darkText: {
    color: "#d6cdea",
    fontSize: 18,
    lineHeight: 28,
    marginTop: 14,
    maxWidth: 670
  },
  missionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 24
  },
  mission: {
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)"
  },
  missionText: {
    color: "#eef6ef",
    fontSize: 14,
    fontWeight: "700"
  },
  rankingBoard: {
    flex: 0.76,
    minWidth: 300,
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#f7f4ff"
  },
  rankingHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16
  },
  rankingTitle: {
    color: "#1d1631",
    fontSize: 21,
    fontWeight: "900"
  },
  rankRow: {
    minHeight: 74,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7ddff",
    marginTop: 10
  },
  rankPosition: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4c1d95"
  },
  rankNumber: {
    color: "#f5d0fe",
    fontWeight: "900",
    fontSize: 18
  },
  rankInfo: {
    flex: 1
  },
  rankName: {
    color: "#1d1631",
    fontSize: 17,
    fontWeight: "900"
  },
  rankBadge: {
    color: "#756b8b",
    fontSize: 13,
    marginTop: 3
  },
  rankPoints: {
    color: "#6d28d9",
    fontSize: 15,
    fontWeight: "900"
  },
  flow: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18
  },
  flowItem: {
    flexGrow: 1,
    flexBasis: 250,
    borderTopWidth: 2,
    borderTopColor: "#7c3aed",
    paddingTop: 18
  },
  flowTitle: {
    color: "#1d1631",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
    marginTop: 14
  },
  flowText: {
    color: "#625b70",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 9
  }
});

export default App;
