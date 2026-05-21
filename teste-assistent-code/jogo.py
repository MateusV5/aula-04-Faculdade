# pyrefly: ignore [missing-import]
import pygame
import sys

# Inicializa o Pygame
pygame.init()

# Configurações da Tela
LARGURA_TELA = 800
ALTURA_TELA = 600
tela = pygame.display.set_mode((LARGURA_TELA, ALTURA_TELA))
pygame.display.set_caption("Pong - Estilo Atari")

# Cores
PRETO = (0, 0, 0)
BRANCO = (255, 255, 255)

# Configurações do Jogo
FPS = 60
relogio = pygame.time.Clock()

# Raquetes
LARGURA_RAQUETE = 15
ALTURA_RAQUETE = 100
VELOCIDADE_RAQUETE = 7

raquete_jogador = pygame.Rect(50, ALTURA_TELA // 2 - ALTURA_RAQUETE // 2, LARGURA_RAQUETE, ALTURA_RAQUETE)
raquete_oponente = pygame.Rect(LARGURA_TELA - 50 - LARGURA_RAQUETE, ALTURA_TELA // 2 - ALTURA_RAQUETE // 2, LARGURA_RAQUETE, ALTURA_RAQUETE)

# Bola
TAMANHO_BOLA = 15
bola = pygame.Rect(LARGURA_TELA // 2 - TAMANHO_BOLA // 2, ALTURA_TELA // 2 - TAMANHO_BOLA // 2, TAMANHO_BOLA, TAMANHO_BOLA)
velocidade_bola_x = 5
velocidade_bola_y = 5

# Pontuação
pontuacao_jogador = 0
pontuacao_oponente = 0
fonte = pygame.font.Font(None, 74)

def desenhar_elementos():
    tela.fill(PRETO)
    pygame.draw.rect(tela, BRANCO, raquete_jogador)
    pygame.draw.rect(tela, BRANCO, raquete_oponente)
    pygame.draw.ellipse(tela, BRANCO, bola)
    pygame.draw.aaline(tela, BRANCO, (LARGURA_TELA // 2, 0), (LARGURA_TELA // 2, ALTURA_TELA))
    
    texto_jogador = fonte.render(str(pontuacao_jogador), True, BRANCO)
    texto_oponente = fonte.render(str(pontuacao_oponente), True, BRANCO)
    tela.blit(texto_jogador, (LARGURA_TELA // 4, 20))
    tela.blit(texto_oponente, (LARGURA_TELA * 3 // 4, 20))

def mover_raquete_jogador(teclas):
    if teclas[pygame.K_w] or teclas[pygame.K_UP]:
        raquete_jogador.y -= VELOCIDADE_RAQUETE
    if teclas[pygame.K_s] or teclas[pygame.K_DOWN]:
        raquete_jogador.y += VELOCIDADE_RAQUETE
    
    # Limites da tela
    if raquete_jogador.top <= 0:
        raquete_jogador.top = 0
    if raquete_jogador.bottom >= ALTURA_TELA:
        raquete_jogador.bottom = ALTURA_TELA

def mover_raquete_oponente():
    # Movimento simples da IA
    if raquete_oponente.centery < bola.y:
        raquete_oponente.y += VELOCIDADE_RAQUETE - 2 # Um pouco mais lento que a bola
    elif raquete_oponente.centery > bola.y:
        raquete_oponente.y -= VELOCIDADE_RAQUETE - 2
        
    # Limites da tela
    if raquete_oponente.top <= 0:
        raquete_oponente.top = 0
    if raquete_oponente.bottom >= ALTURA_TELA:
        raquete_oponente.bottom = ALTURA_TELA

def mover_bola():
    global velocidade_bola_x, velocidade_bola_y, pontuacao_jogador, pontuacao_oponente
    
    bola.x += velocidade_bola_x
    bola.y += velocidade_bola_y
    
    # Colisão com o topo e o fundo
    if bola.top <= 0 or bola.bottom >= ALTURA_TELA:
        velocidade_bola_y *= -1
        
    # Colisão com as raquetes
    if bola.colliderect(raquete_jogador) or bola.colliderect(raquete_oponente):
        velocidade_bola_x *= -1
        
    # Ponto do Oponente
    if bola.left <= 0:
        pontuacao_oponente += 1
        reiniciar_bola()
        
    # Ponto do Jogador
    if bola.right >= LARGURA_TELA:
        pontuacao_jogador += 1
        reiniciar_bola()

def reiniciar_bola():
    global velocidade_bola_x, velocidade_bola_y
    bola.center = (LARGURA_TELA // 2, ALTURA_TELA // 2)
    velocidade_bola_x *= -1 # Bola vai para o lado oposto após o ponto

# Loop Principal
rodando = True
while rodando:
    # 1. Tratamento de Eventos
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # 2. Lógica do Jogo
    teclas_pressionadas = pygame.key.get_pressed()
    mover_raquete_jogador(teclas_pressionadas)
    mover_raquete_oponente()
    mover_bola()

    # 3. Desenho na Tela
    desenhar_elementos()

    # 4. Atualização da Tela e FPS
    pygame.display.flip()
    relogio.tick(FPS)
