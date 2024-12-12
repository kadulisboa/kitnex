interface MessageData {
  userId: string;
  renterId: string;
  chargeId: string;
}

export function generateMessageHash({
  userId,
  renterId,
  chargeId,
}: MessageData): string {
  // Cria a string com os IDs
  const dataString = `${userId}:${renterId}:${chargeId}`;

  // Converte para base64
  return Buffer.from(dataString).toString("base64");
}

export function decodeMessageHash(hash: string): MessageData {
  try {
    // Decodifica o base64
    const decoded = Buffer.from(hash, "base64").toString();

    // Separa os IDs
    const [userId, renterId, chargeId] = decoded.split(":");

    if (!userId || !renterId || !chargeId) {
      throw new Error("Hash inválida");
    }

    return { userId, renterId, chargeId };
  } catch {
    throw new Error("Hash inválida");
  }
}
