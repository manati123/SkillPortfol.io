using Ninject;
using SkillPortofolio.Api.Providers;
using SkillPortofolio.Api.Repositories;


namespace SkillPortofolio.Api.Ninject
{
    public class NinjectCommon
    {
        private static IKernel _kernel;

        private static IKernel Kernel => _kernel ?? (_kernel = GetconfiguredKernel());

        public static T Get<T>()
        {
            return Kernel.Get<T>();
        }

        private static IKernel GetconfiguredKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind(typeof(IRepository)).To(typeof(BaseRepository));
            kernel.Bind(typeof(ISkillProvider)).To(typeof(SkillProvider));
            kernel.Bind(typeof(IActionPointProvider)).To(typeof(ActionPointProvider));
            kernel.Bind(typeof(IJourneyProvider)).To(typeof(JourneyProvider));
            kernel.Bind(typeof(IUserSkillProvider)).To(typeof(UserSkillProvider));
            kernel.Bind(typeof(IUserActionPointProvider)).To(typeof(UserActionPointProvider));
            kernel.Bind(typeof(IUserJourneyProvider)).To(typeof(UserJourneyProvider));
            kernel.Bind(typeof(IUserRepository)).To(typeof(UserRepository));
            kernel.Bind(typeof(IUserProvider)).To(typeof(UserProvider));
            return kernel;
        }
    }
}