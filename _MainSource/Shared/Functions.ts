function YanflyMessageCoreIsThere()
{
    let baseNamespaceIsThere = window["Yanfly"] != null;
    let messageCoreIsThere = baseNamespaceIsThere && window.Yanfly.Message != null;

    return messageCoreIsThere;
}