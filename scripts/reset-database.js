const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('🗑️  Resetting database...\n');

  try {
    // Delete all records
    const deletedResume = await prisma.resumeAnalysis.deleteMany({});
    const deletedCase = await prisma.caseSession.deleteMany({});
    const deletedGuesstimate = await prisma.guesstimateSession.deleteMany({});
    const deletedCompany = await prisma.companyIntelSession.deleteMany({});
    const deletedChat = await prisma.chatMessage.deleteMany({});

    console.log(`✅ Deleted ${deletedResume.count} resume analyses`);
    console.log(`✅ Deleted ${deletedCase.count} case sessions`);
    console.log(`✅ Deleted ${deletedGuesstimate.count} guesstimate sessions`);
    console.log(`✅ Deleted ${deletedCompany.count} company intel sessions`);
    console.log(`✅ Deleted ${deletedChat.count} chat messages`);

    console.log('\n🎉 Database reset complete!');
    console.log('📝 All data has been cleared.');
    console.log('🔄 Refresh your browser to see readiness at 0.\n');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();

